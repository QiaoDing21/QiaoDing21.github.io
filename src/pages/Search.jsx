import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import { useSearch } from "../hooks/useSearch";
import { CalendarIcon, TagIcon, ArrowLeftIcon, SearchIcon } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

const Search = () => {
  const location = useLocation();
  const { searchTerm, setSearchTerm, searchResults, isSearching } = useSearch();
  
  // 从URL参数中获取搜索词
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) {
      setSearchTerm(query);
    }
  }, [location.search, setSearchTerm]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* 返回按钮 */}
        <Link 
          to="/" 
          className="inline-flex items-center mb-4 md:mb-6 px-3 py-1.5 md:px-4 md:py-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-green-700 transition-colors text-sm"
        >
          <ArrowLeftIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          返回首页
        </Link>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-bold text-green-700 mb-4 md:mb-6 flex items-center">
            <SearchIcon className="h-5 w-5 mr-2" />
            搜索结果: {searchTerm}
          </h1>
          
          {isSearching ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4 md:space-y-6">
              {searchResults.map((post) => (
                <Link 
                  key={post.slug} 
                  to={`/post/${post.slug}`}
                  className="block p-3 md:p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all"
                >
                  <div className="flex gap-3 md:gap-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 shrink-0">
                      <img 
                        src={post.frontmatter.cover || `https://nocode.meituan.com/photo/search?keyword=books,reading&width=200&height=200`}
                        alt={post.frontmatter.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h2 className="text-base md:text-lg font-medium text-gray-800 mb-1 md:mb-2">{post.frontmatter.title}</h2>
                      {post.frontmatter.excerpt && (
                        <p className="text-xs md:text-sm text-gray-600 mb-2 line-clamp-2">{post.frontmatter.excerpt}</p>
                      )}
                      <div className="flex flex-wrap items-center text-xs text-gray-500 gap-2 md:gap-4">
                        {post.frontmatter.date && (
                          <span className="flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1 text-green-600" />
                            {format(new Date(post.frontmatter.date), "yyyy年MM月dd日", {
                              locale: zhCN,
                            })}
                          </span>
                        )}
                        {post.frontmatter.tags && (
                          <div className="flex items-center flex-wrap gap-1">
                            <TagIcon className="h-3 w-3 mr-1 text-green-600" />
                            {post.frontmatter.tags.map((tag) => (
                              <span key={tag} className="px-1.5 py-0.5 text-xs bg-gray-100 text-green-700 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <img 
                src="https://nocode.meituan.com/photo/search?keyword=empty,search&width=200&height=200" 
                alt="没有搜索结果" 
                className="w-24 h-24 md:w-32 md:h-32 mx-auto object-cover mb-4"
              />
              <p className="text-lg text-gray-600 mb-2">没有找到与"{searchTerm}"相关的文章</p>
              <p className="text-sm text-gray-500">尝试使用其他关键词或浏览博客分类</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
