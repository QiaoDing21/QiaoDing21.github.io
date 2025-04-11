import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";
import { useQuery } from "@tanstack/react-query";
import { CalendarIcon, TagIcon, ArchiveIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon, BookIcon, StarIcon, HeartIcon, UserIcon } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [currentTag, setCurrentTag] = useState("全部");
  const [currentCategory, setCurrentCategory] = useState("全部");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // 每页显示的文章数量
  const [isMobile, setIsMobile] = useState(false);
  
  // 检测设备类型
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("/posts/index.json");
      const result = await response.json();
      return result.posts || [];
    },
  });

  const posts = data || [];
  
  // 提取所有标签
  const tags = ["全部", ...new Set(posts.flatMap(post => post.frontmatter.tags || []))];
  
  // 创建分类（基于第一个标签）
  const categories = ["全部", ...new Set(posts.map(post => {
    const firstTag = post.frontmatter.tags?.[0];
    return firstTag ? firstTag : "未分类";
  }))];
  
  // 创建归档（按年月分组）
  const archives = posts.reduce((acc, post) => {
    if (post.frontmatter.date) {
      const date = new Date(post.frontmatter.date);
      const yearMonth = format(date, "yyyy年MM月", { locale: zhCN });
      if (!acc[yearMonth]) {
        acc[yearMonth] = [];
      }
      acc[yearMonth].push(post);
    }
    return acc;
  }, {});

  // 根据筛选条件过滤文章
  const filteredPosts = posts.filter(post => {
    const matchTag = currentTag === "全部" || post.frontmatter.tags?.includes(currentTag);
    const matchCategory = currentCategory === "全部" || post.frontmatter.tags?.[0] === currentCategory;
    return matchTag && matchCategory;
  });

  // 分页逻辑
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 当筛选条件改变时，重置页码到第一页
  useEffect(() => {
    setCurrentPage(1);
  }, [currentTag, currentCategory]);

  // 页码变化处理函数
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // 滚动到页面顶部
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 处理标签点击，导航到搜索页面
  const handleTagSearch = (tag) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* 顶部横幅 */}
        <div className="mb-6 md:mb-8 rounded-lg overflow-hidden shadow-md relative">
          <img 
            src="https://nocode.meituan.com/photo/search?keyword=books,library&width=1200&height=400" 
            alt="博客横幅" 
            className="w-full h-40 md:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/70 to-green-800/70 flex items-center">
            <div className="px-4 md:px-8 text-white">
              <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 flex items-center">
                <BookIcon className="mr-2 h-6 w-6 md:h-8 md:w-8 text-white" />
                QD's Blog
              </h1>
              <p className="text-sm md:text-lg max-w-md text-green-100">分享阅读、电影和生活的点滴感悟</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse md:gap-8">
          {/* 侧边栏 - 在移动端显示为水平滚动区域 */}
          {isMobile ? (
            <div className="mb-6 space-y-4">
              {/* 博主信息卡片 */}
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h2 className="text-lg font-bold text-green-700 mb-3 flex items-center">
                  <span className="bg-green-700 w-2 h-6 mr-2 rounded-sm"></span>
                  关于博主
                </h2>
                <div className="flex items-center">
                  <img
                    src="https://nocode.meituan.com/photo/search?keyword=avatar,person,reading&width=120&height=120"
                    alt="Avatar"
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-100 p-1"
                  />
                  <div className="ml-4">
                    <h3 className="text-gray-800 font-medium">豆瓣读者</h3>
                    <p className="text-sm text-gray-600 mb-2">热爱阅读，热爱生活</p>
                    <div className="flex space-x-4 text-xs text-gray-600">
                      <span>文章 {posts.length}</span>
                      <span>标签 {tags.length - 1}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 分类和标签 - 水平滚动 */}
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h2 className="text-lg font-bold text-green-700 mb-3 flex items-center">
                  <span className="bg-green-700 w-2 h-6 mr-2 rounded-sm"></span>
                  <BookIcon className="h-4 w-4 mr-2 text-green-700" />
                  分类 & 标签
                </h2>
                <div className="overflow-x-auto pb-2">
                  <div className="flex space-x-2 min-w-max">
                    {categories.slice(0, 6).map(category => {
                      const count = category === "全部" ? posts.length : 
                        posts.filter(post => post.frontmatter.tags?.[0] === category).length;
                      
                      return (
                        <button
                          key={category}
                          onClick={() => category === "全部" ? setCurrentCategory(category) : handleTagSearch(category)}
                          className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                            currentCategory === category && category === "全部"
                              ? "bg-green-700 text-white font-medium"
                              : "bg-gray-100 text-green-700 hover:bg-gray-200"
                          }`}
                        >
                          {category}
                          {category !== "全部" && <span className="ml-1 text-xs">({count})</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <aside className="w-72 shrink-0 space-y-6">
              {/* 博主信息卡片 */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center">
                  <span className="bg-green-700 w-2 h-6 mr-2 rounded-sm"></span>
                  关于博主
                </h2>
                <div className="text-center">
                  <img
                    src="https://nocode.meituan.com/photo/search?keyword=avatar,person,reading&width=120&height=120"
                    alt="Avatar"
                    className="w-24 h-24 rounded-full mx-auto object-cover mb-4 border-2 border-green-100 p-1"
                  />
                  <h3 className="text-gray-800 font-medium mb-2">豆瓣读者</h3>
                  <p className="text-sm text-gray-600 mb-4">热爱阅读，热爱生活</p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-600">
                    <span>文章 {posts.length}</span>
                    <span>标签 {tags.length - 1}</span>
                  </div>
                </div>
              </div>

              {/* 分类卡片 - 改为标签形式 */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center">
                  <span className="bg-green-700 w-2 h-6 mr-2 rounded-sm"></span>
                  <BookIcon className="h-4 w-4 mr-2 text-green-700" />
                  文章分类
                </h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => {
                    const count = category === "全部" ? posts.length : 
                      posts.filter(post => post.frontmatter.tags?.[0] === category).length;
                    
                    return (
                      <button
                        key={category}
                        onClick={() => category === "全部" ? setCurrentCategory(category) : handleTagSearch(category)}
                        className={`px-3 py-1.5 rounded-full transition-all ${
                          currentCategory === category && category === "全部"
                            ? "bg-green-700 text-white font-medium"
                            : "bg-gray-100 text-green-700 hover:bg-gray-200"
                        }`}
                      >
                        {category}
                        {category !== "全部" && <span className="ml-1 text-xs">({count})</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 标签云 */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center">
                  <span className="bg-green-700 w-2 h-6 mr-2 rounded-sm"></span>
                  <TagIcon className="h-4 w-4 mr-2 text-green-700" />
                  标签云
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => {
                    // 计算标签出现次数来决定字体大小
                    const count = tag === "全部" ? posts.length : 
                      posts.filter(post => post.frontmatter.tags?.includes(tag)).length;
                    const fontSize = tag === "全部" ? "text-base" : 
                      count > 3 ? "text-base" : count > 1 ? "text-sm" : "text-xs";
                    
                    return (
                      <button
                        key={tag}
                        onClick={() => tag === "全部" ? setCurrentTag(tag) : handleTagSearch(tag)}
                        className={`px-3 py-1.5 ${fontSize} rounded-full transition-all ${
                          currentTag === tag && tag === "全部"
                            ? "bg-green-700 text-white font-medium"
                            : "bg-gray-100 text-green-700 hover:bg-gray-200"
                        }`}
                      >
                        {tag}
                        {tag !== "全部" && <span className="ml-1 text-xs">({count})</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 归档 */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center">
                  <span className="bg-green-700 w-2 h-6 mr-2 rounded-sm"></span>
                  <ArchiveIcon className="h-4 w-4 mr-2 text-green-700" />
                  归档
                </h2>
                <div className="space-y-3">
                  {Object.entries(archives).sort((a, b) => new Date(b[0]) - new Date(a[0])).map(([yearMonth, archivePosts]) => (
                    <div key={yearMonth} className="group">
                      <div 
                        className="flex items-center text-gray-700 font-medium cursor-pointer hover:text-green-700"
                        onClick={() => {
                          const yearMonthQuery = yearMonth.replace('年', '-').replace('月', '');
                          navigate(`/search?q=${encodeURIComponent(yearMonthQuery)}`);
                        }}
                      >
                        <CalendarIcon className="h-4 w-4 mr-2 text-green-700" />
                        {yearMonth}
                        <span className="ml-auto text-xs text-gray-500">({archivePosts.length})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* 主内容区 */}
          <main className="flex-1">
            <div className="space-y-4 md:space-y-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-md">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-700 border-t-transparent"></div>
                </div>
              ) : currentPosts.length > 0 ? (
                <>
                  {currentPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} isMobile={isMobile} />
                  ))}
                  
                  {/* 分页控件 */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-6 md:mt-8 space-x-2">
                      <button 
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-green-700 hover:bg-gray-100'}`}
                      >
                        <ChevronLeftIcon className="h-5 w-5" />
                      </button>
                      
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        // 移动端只显示当前页码和前后各一页
                        if (isMobile) {
                          if (
                            pageNumber === 1 || 
                            pageNumber === totalPages || 
                            pageNumber === currentPage ||
                            pageNumber === currentPage - 1 ||
                            pageNumber === currentPage + 1
                          ) {
                            return (
                              <button
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}
                                className={`w-8 h-8 rounded-full ${
                                  currentPage === pageNumber
                                    ? "bg-green-700 text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {pageNumber}
                              </button>
                            );
                          } else if (
                            (pageNumber === currentPage - 2 && currentPage > 3) || 
                            (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
                          ) {
                            // 显示省略号
                            return <span key={pageNumber} className="px-1 text-gray-500">...</span>;
                          }
                          return null;
                        } else {
                          // 桌面端显示当前页码前后各1页，以及第一页和最后一页
                          if (
                            pageNumber === 1 || 
                            pageNumber === totalPages || 
                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}
                                className={`w-8 h-8 rounded-full ${
                                  currentPage === pageNumber
                                    ? "bg-green-700 text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {pageNumber}
                              </button>
                            );
                          } else if (
                            (pageNumber === currentPage - 2 && currentPage > 3) || 
                            (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
                          ) {
                            // 显示省略号
                            return <span key={pageNumber} className="px-1 text-gray-500">...</span>;
                          }
                          return null;
                        }
                      })}
                      
                      <button 
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-green-700 hover:bg-gray-100'}`}
                      >
                        <ChevronRightIcon className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md p-6 text-center">
                  <img 
                    src="https://nocode.meituan.com/photo/search?keyword=empty,books&width=200&height=200" 
                    alt="没有文章" 
                    className="w-24 h-24 md:w-32 md:h-32 mx-auto object-cover mb-4"
                  />
                  <p className="text-lg text-gray-600">暂无符合条件的文章</p>
                  <button 
                    onClick={() => {
                      setCurrentTag("全部");
                      setCurrentCategory("全部");
                    }}
                    className="mt-4 px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors"
                  >
                    查看全部文章
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
