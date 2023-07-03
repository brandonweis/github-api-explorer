import { Author } from "../types";

const UserCard = ({ user }: { user: Author }) => {
  return (
    <div className="w-35 px-4 mb-4 mr-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-4">
        <img
          className="w-10 h-10 mt-3 mb-1 rounded-full shadow-lg"
          src={user.avatarUrl}
          alt={user.login}
        />
        <h5 className="mb-1 text-md font-medium text-gray-900 dark:text-white">
          {user.login}
        </h5>
        <div className="flex mt-1 space-x-3 md:mt-6">
          <a
            href={user.url}
            target="_blank"
            className="inline-flex items-center px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
