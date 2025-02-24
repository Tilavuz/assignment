import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/layouts/root-layout";
import ErrorPage from "@/pages/error";
import Home from "@/pages/home/home";
import Teacher from "./pages/teacher/teacher";
import Identification from "./pages/identification/identification";
import SubLayout from "./layouts/sub-layout";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/teachers/:id",
          element: <Teacher />,
        },
      ],
    },
    {
      path: "/identification",
      element: <SubLayout />,
      children: [
        {
          index: true,
          element: <Identification />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
