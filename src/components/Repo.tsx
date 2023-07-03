import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getRepo } from "../api/query";
import IssueCard from "./IssueCard";
import { GraphqlClientContext, StoreContext, StoreType } from "../api/Provider";
import { IssueType, PageInfoType } from "../types";

const Repo = () => {
  const store = useContext(StoreContext) as StoreType;
  const [pageInfo, setPageInfo] = useState<PageInfoType>();
  const [issues, setIssues] = useState<IssueType[]>([]);
  const [loading, setLoading] = useState(false);
  const makeRequest = useContext(GraphqlClientContext);
  const navigate = useNavigate();

  const { owner, repository } = useParams();
  let { state } = useLocation();

  const loadMore = () => {
    if (
      !pageInfo?.hasNextPage ||
      (pageInfo.hasNextPage !== true && !pageInfo.endCursor)
    )
      return;

    let query = getRepo(
      owner as string,
      repository as string,
      pageInfo.endCursor
    );
    setLoading(true);
    makeRequest(query, store.tokenStore.token)
      .then((res) => {
        if (!res.data.data.errors) {
          setIssues([...issues, ...res.data.data.repository.issues.nodes]);
          setPageInfo(res.data.data.repository.issues.pageInfo);
        }
      })
      .catch((e) => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!store.tokenStore.token) {
      navigate("/");
    }

    let query = getRepo(owner as string, repository as string, "");

    setLoading(true);
    makeRequest(query, store.tokenStore.token)
      .then((res) => {
        if (!res.data.data.errors) {
          setIssues(res.data.data.repository.issues.nodes);
          setPageInfo(res.data.data.repository.issues.pageInfo);
        }
      })
      .catch((e) => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col justify-stretch max-w-xl mx-auto">
      <div className="">
        <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          {repository}
        </h2>
        <p className="mb-1 text-md font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          {state.description}
        </p>
        <p className="mb-10 text-md font-bold text-gray-500 lg:text-xl dark:text-gray-400">
          by {owner}
        </p>
        <h3 className="mb-4 text-3xl font-bold text-black-500 lg:text-xl dark:text-white-400">
          Latest Issues
        </h3>
      </div>
      {!!issues &&
        issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} author={issue.author} />
        ))}
      <button
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

export default Repo;
