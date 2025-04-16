import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import Header from "../components/Header";
import { CalendarIcon, ClockIcon, TagIcon, ShareIcon, BookmarkIcon, ArrowLeftIcon, BookIcon, ChevronLeftIcon, ChevronRightIcon, ListIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import "github-markdown-css/github-markdown-light.css";
import "highlight.js/styles/github.css";

const TableOfContents = ({ headings }) => {
  const [activeId, setActiveId] = useState("");
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  return (
    <nav className="toc text-sm">
      <h3 className="font-medium text-green-700 mb-2 flex items-center">
        <ListIcon className="h-4 w-4 mr-1" />
        目录
      </h3>
      <ul className="space-y-1 pl-1">
        {headings.map((heading) => (
          <li 
            key={heading.id} 
            className={`${
              heading.level === 2 ? "pl-0" : "pl-3"
            } ${
              activeId === heading.id ? "text-green-700 font-medium" : "text-gray-600"
            } hover:text-green-700 transition-colors`}
          >
            <div 
              className="block py-1 border-l-2 pl-2 hover:border-green-500 transition-colors"
              style={{
                borderColor: activeId === heading.id ? "#15803d" : "transparent"
              }}
            >
              {heading.text}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const BlogPost = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [headings, setHeadings] = useState([]);
  const [showToc, setShowToc] = useState(false);
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
  
  // 从路径中提取文章slug
  const slug = pathname.replace('/post/', '');
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      try {
        const response = await fetch(`/posts/${slug}.md`);
        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.status}`);
        }
        return response.text();
      } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
      }
    },
  });

  const { data: postMeta } = useQuery({
    queryKey: ["postMeta", slug],
    queryFn: async () => {
      try {
        const response = await fetch("/posts/index.json");
        const result = await response.json();
        return result.posts.find(p => p.slug === slug) || {};
      } catch (error) {
        console.error("Error fetching post metadata:", error);
        return {};
      }
    },
  });

  const { data: allPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("/posts/index.json");
      const result = await response.json();
      return result.posts || [];
    },
  });

  // 提取标题以生成目录
  useEffect(() => {
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const headingsList = Array.from(elements).map(heading => ({
        id: heading.id,
        text: heading.textContent,
        level: parseInt(heading.tagName.substring(1))
      }));
      setHeadings(headingsList);
      setShowToc(headingsList.length > 2); // 只有当有足够的标题时才显示目录
    }
  }, [post]);

  const frontmatter = postMeta?.frontmatter || {};

  // 查找相关文章（基于标签匹配）
  const relatedPosts = allPosts?.filter(p => 
    p.slug !== slug && // 排除当前文章
    p.frontmatter.tags?.some(tag => frontmatter.tags?.includes(tag))
  ).slice(0, 2) || [];

  // 如果相关文章不足2篇，添加最新文章补充
  const recentPosts = allPosts?.filter(p => 
    p.slug !== slug && !relatedPosts.some(rp => rp.slug === p.slug)
  ).sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)).slice(0, 2 - relatedPosts.length) || [];

  // 合并相关文章和最新文章
  const recommendedPosts = [...relatedPosts, ...recentPosts];

  // 查找当前文章在所有文章中的位置，以便导航到上一篇/下一篇
  const currentIndex = allPosts?.findIndex(p => p.slug === slug) || -1;
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < (allPosts?.length || 0) - 1 ? allPosts[currentIndex + 1] : null;

  // 处理标签点击，导航到搜索页面
  const handleTagSearch = (tag) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">文章未找到</h1>
            <p className="text-gray-600 mb-6">抱歉，我们无法找到您请求的文章。</p>
            <Link 
              to="/" 
              className="inline-flex items-center px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              返回首页
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* 返回按钮 */}
        <Link 
          to="/" 
          className="inline-flex items-center mb-4 md:mb-6 px-3 py-1.5 md:px-4 md:py-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-green-700 transition-colors text-sm"
        >
          <ArrowLeftIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          返回首页
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          <article className="bg-white rounded-lg shadow-md overflow-hidden lg:flex-1">
            {/* 文章封面图 */}
            <div className="relative">
              <img 
                src={frontmatter.cover || `https://nocode.meituan.com/photo/search?keyword=books,reading,${frontmatter.tags?.[0] || 'library'}&width=1200&height=400`}
                alt={frontmatter.title}
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent flex items-end">
                <div className="p-4 md:p-8 text-gray-800">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 flex items-center">
                    <BookIcon className="h-5 w-5 md:h-6 md:w-6 mr-2 text-green-700" />
                    {frontmatter.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm">
                    {frontmatter.date && (
                      <div className="flex items-center">
                        <CalendarIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 text-green-700" />
                        {format(new Date(frontmatter.date), isMobile ? "MM月dd日" : "yyyy年MM月dd日", {
                          locale: zhCN,
                        })}
                      </div>
                    )}
                    {frontmatter.readTime && (
                      <div className="flex items-center">
                        <ClockIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 text-green-700" />
                        {frontmatter.readTime}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 文章内容 */}
            <div className="p-4 md:p-8">
              <div className="flex gap-2 md:gap-4 mb-4 md:mb-6 flex-wrap">
                {frontmatter.tags?.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagSearch(tag)}
                    className="px-2 md:px-3 py-1 text-xs md:text-sm bg-gray-100 text-green-700 rounded-full flex items-center hover:bg-gray-200 transition-colors"
                  >
                    <TagIcon className="h-3 w-3 mr-1" />
                    {tag}
                  </button>
                ))}
              </div>

              <div 
                ref={contentRef}
                className="markdown-body prose prose-sm md:prose-lg max-w-none prose-headings:text-green-700 prose-a:text-green-700 prose-strong:text-green-800 prose-code:text-green-800 prose-pre:bg-gray-50 prose-pre:border prose-pre:border-green-100"
              >
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[
                    rehypeRaw, 
                    rehypeHighlight, 
                    rehypeSlug
                  ]}
                >
                  {post}
                </ReactMarkdown>
              </div>

              {/* 文章底部 */}
              <div className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-green-100 flex justify-between items-center">
                <div className="text-xs md:text-sm text-gray-600">
                  感谢阅读！
                </div>
                {/* <div className="flex space-x-2 md:space-x-4">
                  <button className="p-1.5 md:p-2 rounded-full bg-gray-100 text-green-700 hover:bg-green-700 hover:text-white transition-colors">
                    <ShareIcon className="h-4 w-4 md:h-5 md:w-5" />
                  </button>
                  <button className="p-1.5 md:p-2 rounded-full bg-gray-100 text-green-700 hover:bg-green-700 hover:text-white transition-colors">
                    <BookmarkIcon className="h-4 w-4 md:h-5 md:w-5" />
                  </button>
                </div> */}
              </div>
              
              {/* 上一篇/下一篇导航 */}
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-between gap-3 md:gap-4">
                {prevPost ? (
                  <Link 
                    to={`/post/${prevPost.slug}`}
                    className="flex items-center p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group flex-1"
                  >
                    <ChevronLeftIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-700 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5 md:mb-1">上一篇</div>
                      <div className="font-medium text-sm md:text-base text-gray-800 line-clamp-1">{prevPost.frontmatter.title}</div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1"></div>
                )}
                
                {nextPost ? (
                  <Link 
                    to={`/post/${nextPost.slug}`}
                    className="flex items-center justify-end p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group text-right flex-1"
                  >
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5 md:mb-1">下一篇</div>
                      <div className="font-medium text-sm md:text-base text-gray-800 line-clamp-1">{nextPost.frontmatter.title}</div>
                    </div>
                    <ChevronRightIcon className="h-4 w-4 md:h-5 md:w-5 ml-2 text-green-700 group-hover:transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <div className="flex-1"></div>
                )}
              </div>
            </div>
          </article>

          {/* 侧边栏 - 在移动端显示在文章下方 */}
          {isMobile ? (
            <div className="space-y-4">
              {/* 相关文章 */}
              {/* <div className="bg-white rounded-lg p-4 shadow-md">
                <h2 className="text-lg font-bold text-green-700 mb-3 flex items-center">
                  <span className="bg-green-700 w-2 h-6 mr-2 rounded-sm"></span>
                  相关文章
                </h2>
                <div className="space-y-3">
                  {recommendedPosts.map(post => (
                    <Link 
                      key={post.slug} 
                      to={`/post/${post.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <img 
                          src={post.frontmatter.cover || `https://nocode.meituan.com/photo/search?keyword=${post.frontmatter.tags?.[0] || 'books'},reading&width=100&height=100`}
                          alt={post.frontmatter.title} 
                          className="w-16 h-16 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                        />
                        <div>
                          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-green-700 transition-colors">
                            {post.frontmatter.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(post.frontmatter.date), "MM月dd日", {
                              locale: zhCN,
                            })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div> */}
              
              {/* 移动端目录 - 可折叠 */}
              {showToc && (
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <details>
                    <summary className="text-lg font-bold text-green-700 mb-2 flex items-center cursor-pointer">
                      <span className="bg-green-700 w-2 h-6 mr-2 rounded-sm"></span>
                      <ListIcon className="h-4 w-4 mr-2 text-green-700" />
                      目录
                    </summary>
                    <div className="pt-2">
                      <TableOfContents headings={headings} />
                    </div>
                  </details>
                </div>
              )}
            </div>
          ) : (
            <aside className="w-full lg:w-72 shrink-0 space-y-6">
              {/* 目录 */}
              {showToc && (
                <div className="bg-white rounded-lg p-6 shadow-md sticky top-20">
                  <TableOfContents headings={headings} />
                </div>
              )}

              {/* 相关文章 */}
              {/* <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center">
                  <span className="bg-green-700 w-2 h-6 mr-2 rounded-sm"></span>
                  相关文章
                </h2>
                <div className="space-y-4">
                  {recommendedPosts.map(post => (
                    <Link 
                      key={post.slug} 
                      to={`/post/${post.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <img 
                          src={post.frontmatter.cover || `https://nocode.meituan.com/photo/search?keyword=${post.frontmatter.tags?.[0] || 'books'},reading&width=100&height=100`}
                          alt={post.frontmatter.title} 
                          className="w-16 h-16 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                        />
                        <div>
                          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-green-700 transition-colors">
                            {post.frontmatter.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(post.frontmatter.date), "yyyy年MM月dd日", {
                              locale: zhCN,
                            })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div> */}
            </aside>
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogPost;