import routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Provider from "./api/Provider.tsx";

const router = createBrowserRouter(routes);

function App() {
  return (
    <Provider>
      <div className="container mx-auto p-8 m-10">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
