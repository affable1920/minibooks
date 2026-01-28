import { createBrowserRouter } from "react-router";
import Home from "@/pages/Home";
import Layout from "@/components/Layout";
import ErrorBoundary from "./pages/ErrorBoundary";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";

const router = createBrowserRouter([
  {
    Component: Layout,
    ErrorBoundary: ErrorBoundary,
    children: [
      { index: true, Component: Home },
      { path: "dash", Component: Dashboard },
      { path: "auth", Component: Auth },
    ],
  },
]);

export default router;
