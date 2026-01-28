import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";
import router from "./router.tsx";

import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-center" duration={1500} />
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
