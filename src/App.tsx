import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/layouts/root-layout";
import ErrorPage from "@/pages/error";
import Home from "@/pages/home/home";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
