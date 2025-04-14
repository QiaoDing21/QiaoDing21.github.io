import { HomeIcon, BookOpenIcon, UserIcon, SearchIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Search from "./pages/Search.jsx";

export const navItems = [
  {
    title: "首页",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "关于",
    to: "/about",
    icon: <UserIcon className="h-4 w-4" />,
    page: <About />,
  },
  {
    title: "",
    to: "/post/*",
    icon: <></>,
    page: <BlogPost />,
  },
  {
    title: "搜索",
    to: "/search",
    icon: <SearchIcon className="h-4 w-4" />,
    page: <Search />,
    hidden: true, // 在导航栏中隐藏，但仍然可以通过路由访问
  }
];
