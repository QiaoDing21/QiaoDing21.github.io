import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { navItems } from "./nav-items";

// 创建一个新的 QueryClient 实例
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5, // 5分钟
    },
  },
});

// 创建路由配置
const router = createHashRouter(
  navItems.map(({ to, page }) => ({
    path: to,
    element: page,
  })),
  {
    future: {
      v7_relativeSplatPath: true
    }
  }
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <RouterProvider 
        router={router} 
        future={{
          v7_startTransition: true
        }}
      />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
