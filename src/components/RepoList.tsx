import {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getRepos } from "../api/query";
import RepoCard from "./RepoCard";
import { GraphqlClientContext, StoreContext, StoreType } from "../api/Provider";
import { PageInfoType, RepoType } from "../types";
import { Link, useNavigate } from "react-router-dom";

type RepoNodeType = {
  node: RepoType;
};

const RepoList = () => {
  const store = useContext(StoreContext) as StoreType;
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [repos, setRepos] = useState<RepoNodeType[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfoType>({
    hasNextPage: false,
    endCursor: "",
  });
  const [loading, setLoading] = useState(false);
  const makeRequest = useContext(GraphqlClientContext);
  const navigate = useNavigate();

  const onSearch = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!searchRef.current) return;

    const value = searchRef.current.value;

    console.log(value);

    setSearch(value);
    setPageInfo({
      hasNextPage: false,
      endCursor: "",
    });
  }, []);

  const loadMore = useCallback(() => {
    if (
      !pageInfo?.hasNextPage ||
      (pageInfo.hasNextPage !== true && !pageInfo.endCursor)
    )
      return;

    let query = getRepos(search, pageInfo.endCursor);
    setLoading(true);
    makeRequest(query, store.tokenStore.token)
      .then((res) => {
        if (!res.data.data.errors) {
          setRepos([...repos, ...res.data.data.search.edges]);
          setPageInfo(res.data.data.search.pageInfo);
        }
      })
      .catch((e) => {})
      .finally(() => setLoading(false));
  }, [pageInfo, search, store, repos]);

  const firstQuery = useCallback(() => {
    let query = getRepos(search, pageInfo.endCursor);
    setLoading(true);
    makeRequest(query, store.tokenStore.token)
      .then((res) => {
        if (!res.data.data.errors) {
          setRepos(res.data.data.search.edges);
          setPageInfo(res.data.data.search.pageInfo);
        }
      })
      .catch((e) => {})
      .finally(() => setLoading(false));
  }, [search, pageInfo, store]);

  useEffect(() => {
    if (!store.tokenStore.token) {
      navigate("/");
    }

    firstQuery();
  }, [search]);

  return (
    <div className="flex flex-col justify-stretch max-w-lg mx-auto">
      <div className="absolute top-5 right-5">
        <button
          disabled={loading}
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <Link to="/">Change API token</Link>
        </button>
      </div>
      <div className="text-center ">
        <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Github Public Repositories
        </h2>
      </div>
      <div>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            ref={searchRef}
            type="search"
            name="search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search github reposotories"
          />
          <button
            onClick={onSearch}
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>

      {repos.map((repo) => (
        <RepoCard key={repo.node.id} repo={repo.node} />
      ))}
      <button
        hidden={!pageInfo?.hasNextPage}
        onClick={loadMore}
        disabled={loading}
        type="button"
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        {loading && (
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
        )}

        {loading ? "Loading..." : "Load more"}
      </button>
    </div>
  );
};

export default RepoList;
