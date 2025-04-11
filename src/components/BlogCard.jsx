import { Link } from "react-router-dom";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { CalendarIcon, ClockIcon, ArrowRightIcon } from "lucide-react";

const BlogCard = ({ post, isMobile }) => {
  const { slug, frontmatter } = post;
  
  // 移动端布局
  if (isMobile) {
    return (
      <Link to={`/post/${slug}`}>
        <article className="group bg-white border border-gray-200 hover:border-green-500 rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
          <div className="p-4">
            <div className="w-full h-40 mb-3 overflow-hidden rounded-lg">
              <img
                src={frontmatter.cover || `https://nocode.meituan.com/photo/search?keyword=books,reading&width=400&height=300`}
                alt={frontmatter.title}
                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-green-700 mb-2 line-clamp-2 transition-colors">
              {frontmatter.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {frontmatter.excerpt || "暂无描述"}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-3">
                <span className="flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1 text-green-700" />
                  {format(new Date(frontmatter.date), "MM月dd日", {
                    locale: zhCN,
                  })}
                </span>
                <span className="flex items-center">
                  <ClockIcon className="h-3 w-3 mr-1 text-green-700" />
                  {frontmatter.readTime || "5分钟"}
                </span>
              </div>
              <span className="text-xs text-green-700 flex items-center">
                阅读全文 <ArrowRightIcon className="h-3 w-3 ml-1" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }
  
  // 桌面端布局
  return (
    <Link to={`/post/${slug}`}>
      <article className="group bg-white border border-gray-200 hover:border-green-500 rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
        <div className="flex gap-6 p-6">
          <div className="w-48 h-32 shrink-0 overflow-hidden rounded-lg">
            <img
              src={frontmatter.cover || `https://nocode.meituan.com/photo/search?keyword=books,reading&width=400&height=300`}
              alt={frontmatter.title}
              className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-medium text-gray-800 group-hover:text-green-700 mb-2 line-clamp-1 transition-colors">
              {frontmatter.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {frontmatter.excerpt || "暂无描述"}
            </p>
            <div className="flex items-center text-xs text-gray-500 space-x-4">
              <span className="flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1 text-green-700" />
                {format(new Date(frontmatter.date), "yyyy年MM月dd日", {
                  locale: zhCN,
                })}
              </span>
              <span className="flex items-center">
                <ClockIcon className="h-3 w-3 mr-1 text-green-700" />
                {frontmatter.readTime || "5分钟"}
              </span>
              <div className="flex-1" />
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-green-50 text-green-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {(frontmatter.tags?.length || 0) > 2 && (
                  <span className="px-2 py-0.5 text-xs bg-green-50 text-green-700 rounded-full">
                    +{frontmatter.tags.length - 2}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <span className="text-xs text-green-700 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                阅读全文 <ArrowRightIcon className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
