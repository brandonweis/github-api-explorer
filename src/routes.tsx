import Home from "./components/Home";
import Repo from "./components/Repo";
import RepoList from "./components/RepoList";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Not found</div>,
  },
  {
    path: "/repos",
    element: <RepoList />,
  },
  {
    path: "/repos/:owner/:repository",
    element: <Repo />,
  },
];

export default routes;
