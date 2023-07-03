import { Link } from "react-router-dom";
import { RepoType } from "../types";

const RepoCard = ({ repo }: { repo: RepoType }) => (
  <div className="p-6 my-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {repo.name}
      </h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-ellipsis">
      {repo.description}
    </p>
    <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
      <svg
        aria-hidden="true"
        className="text-yellow-400 w-5 h-5 inline m-0 mr-2"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>First star</title>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>

      {repo.stargazers.totalCount}
    </p>
    <Link
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      to={`/repos/${repo.owner.login}/${repo.name}`}
      state={{ id: repo.id, description: repo.description, url: repo.url }}
    >
      View more
      <svg
        aria-hidden="true"
        className="w-4 h-4 ml-2 -mr-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    </Link>
  </div>
);

export default RepoCard;
