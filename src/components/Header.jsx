import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navItems } from "../nav-items";
import { SearchIcon, BookIcon, HeartIcon, MenuIcon, XIcon } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import SearchResults from "./SearchResults";

const Header = () => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, searchResults, isSearching, clearSearch } = useSearch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
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

  // 点击外部关闭搜索结果
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 当有搜索词时自动打开搜索结果
  useEffect(() => {
    if (searchTerm) {
      setIsSearchOpen(true);
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // 关闭搜索结果弹窗
      setIsSearchOpen(false);
      // 导航到搜索页面
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      // 如果移动菜单打开，则关闭
      setIsMobileMenuOpen(false);
    } else {
      setIsSearchOpen(true);
    }
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    clearSearch();
  };
  
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-green-200 shadow-sm sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 md:h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-green-700 flex items-center group">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-green-700 rounded-full flex items-center justify-center text-white mr-2 group-hover:rotate-12 transition-transform">
                <BookIcon className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span>QD's Blog</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            {/* 移动端搜索和菜单按钮 */}
            {isMobile ? (
              <div className="flex items-center">
                <div className="relative mr-2" ref={searchRef}>
                  <button 
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-2 text-green-700"
                  >
                    <SearchIcon className="h-5 w-5" />
                  </button>
                  
                  {isSearchOpen && (
                    <div className="absolute top-full right-0 mt-2 w-screen max-w-xs -mr-4 bg-white rounded-lg shadow-lg border border-green-200 p-3">
                      <form onSubmit={handleSearchSubmit} className="mb-2">
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="搜索文章..." 
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-9 pr-4 py-2 text-sm rounded-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            autoFocus
                          />
                          <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <SearchIcon className="h-4 w-4 text-green-500" />
                          </button>
                        </div>
                      </form>
                      
                      <SearchResults 
                        results={searchResults} 
                        isSearching={isSearching} 
                        searchTerm={searchTerm}
                        onClose={handleCloseSearch}
                      />
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-green-700 ml-1"
                >
                  {isMobileMenuOpen ? (
                    <XIcon className="h-5 w-5" />
                  ) : (
                    <MenuIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            ) : (
              // 桌面端搜索和导航
              <div className="flex items-center">
                <div className="relative mr-6 group" ref={searchRef}>
                  <form onSubmit={handleSearchSubmit}>
                    <input 
                      type="text" 
                      placeholder="搜索文章..." 
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="pl-9 pr-4 py-1.5 text-sm rounded-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-48 transition-all group-hover:w-56 bg-white text-gray-800"
                      onClick={() => setIsSearchOpen(true)}
                    />
                    <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <SearchIcon className="h-4 w-4 text-green-500" />
                    </button>
                  </form>
                  
                  {isSearchOpen && (
                    <SearchResults 
                      results={searchResults} 
                      isSearching={isSearching} 
                      searchTerm={searchTerm}
                      onClose={handleCloseSearch}
                    />
                  )}
                </div>
                
                <div className="flex items-center space-x-8">
                  {navItems.filter(item => !item.to.includes(":") && !item.hidden).map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="text-gray-700 hover:text-green-700 flex items-center space-x-2 transition-colors text-sm relative group"
                    >
                      <span className="text-green-600 group-hover:scale-110 transition-transform">{item.icon}</span>
                      <span>{item.title}</span>
                      <span className="absolute top-6 right-10 bottom-0 left-0 w-0 h-0.5 bg-green-700 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* 移动端菜单 */}
        {isMobile && isMobileMenuOpen && (
          <div className="bg-white border-t border-green-100 py-3">
            <div className="space-y-2">
              {navItems.filter(item => !item.to.includes(":") && !item.hidden).map((item) => (
                <button
                  key={item.to}
                  onClick={() => handleNavigation(item.to)}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                  <span className="text-green-600 mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                </button>
              ))}
              
              {/* 移动端搜索表单 */}
              {!isSearchOpen && (
                <form onSubmit={handleSearchSubmit} className="px-4 py-2">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="搜索文章..." 
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full pl-9 pr-4 py-2 text-sm rounded-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <SearchIcon className="h-4 w-4 text-green-500" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
