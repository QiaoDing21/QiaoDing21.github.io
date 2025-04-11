import { Link } from "react-router-dom";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { CalendarIcon, TagIcon, XIcon } from "lucide-react";

const SearchResults = ({ results, isSearching, searchTerm, onClose }) => {
  if (!searchTerm) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-screen max-w-xs md:max-w-md -mr-4 md:mr-0 max-h-[60vh] overflow-y-auto bg-white rounded-lg shadow-lg border border-green-200 z-50">
      <div className="sticky top-0 bg-white p-3 border-b border-green-200 flex justify-between items-center">
        <h3 className="text-green-700 font-medium">
          {isSearching ? "搜索中..." : `搜索结果 (${results.length})`}
        </h3>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <XIcon className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      
      {results.length > 0 ? (
        <div className="divide-y divide-green-100">
          {results.map((post) => (
            <Link 
              key={post.slug} 
              to={`/post/${post.slug}`}
              onClick={onClose}
              className="block p-3 hover:bg-green-50 transition-colors"
            >
              <h4 className="font-medium text-gray-800 mb-1">{post.frontmatter.title}</h4>
              {post.frontmatter.excerpt && (
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.frontmatter.excerpt}</p>
              )}
              <div className="flex items-center text-xs text-gray-500 space-x-3">
                {post.frontmatter.date && (
                  <span className="flex items-center">
                    <CalendarIcon className="h-3 w-3 mr-1 text-green-600" />
                    {format(new Date(post.frontmatter.date), "yyyy年MM月dd日", {
                      locale: zhCN,
                    })}
                  </span>
                )}
                {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                  <span className="flex items-center">
                    <TagIcon className="h-3 w-3 mr-1 text-green-600" />
                    {post.frontmatter.tags.slice(0, 2).join(", ")}
                    {post.frontmatter.tags.length > 2 && "..."}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center">
          <img 
            src="https://nocode.meituan.com/photo/search?keyword=empty,search&width=120&height=120" 
            alt="没有搜索结果" 
            className="w-24 h-24 mx-auto object-cover mb-3"
          />
          <p className="text-gray-600">没有找到与"{searchTerm}"相关的文章</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
