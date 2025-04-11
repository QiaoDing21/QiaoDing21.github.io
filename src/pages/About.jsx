import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { GithubIcon, TwitterIcon, LinkedinIcon, MailIcon, ArrowLeftIcon, BookIcon, HeartIcon } from "lucide-react";

const About = () => {
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
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* 顶部封面 */}
          <div className="h-40 md:h-64 bg-gradient-to-r from-green-50 to-green-100 relative">
            <img 
              src="https://nocode.meituan.com/photo/search?keyword=books,library,pattern&width=1200&height=400" 
              alt="封面图案" 
              className="w-full h-full object-cover mix-blend-overlay opacity-30"
            />
            <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 flex justify-center">
              <img 
                src="https://nocode.meituan.com/photo/search?keyword=reader,avatar&width=180&height=180" 
                alt="个人头像" 
                className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>
          
          <div className="pt-16 md:pt-24 p-4 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">豆瓣读者</h1>
              <p className="text-base md:text-lg text-gray-600">书籍爱好者 & 生活记录者</p>
              
              <div className="flex justify-center space-x-3 md:space-x-4 mt-4">
                <a href="#" className="p-1.5 md:p-2 rounded-full bg-gray-100 text-green-700 hover:bg-green-700 hover:text-white transition-colors">
                  <GithubIcon className="h-4 w-4 md:h-5 md:w-5" />
                </a>
                <a href="#" className="p-1.5 md:p-2 rounded-full bg-gray-100 text-green-700 hover:bg-green-700 hover:text-white transition-colors">
                  <TwitterIcon className="h-4 w-4 md:h-5 md:w-5" />
                </a>
                <a href="#" className="p-1.5 md:p-2 rounded-full bg-gray-100 text-green-700 hover:bg-green-700 hover:text-white transition-colors">
                  <LinkedinIcon className="h-4 w-4 md:h-5 md:w-5" />
                </a>
                <a href="#" className="p-1.5 md:p-2 rounded-full bg-gray-100 text-green-700 hover:bg-green-700 hover:text-white transition-colors">
                  <MailIcon className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              </div>
            </div>
            
            <div className="prose prose-sm md:prose-lg max-w-none">
              <p className="text-center mb-6 md:mb-8">
                欢迎来到我的博客！我是一名热爱阅读和写作的博主。这个博客是我用来分享读书笔记、生活感悟和旅行见闻的地方。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-3 md:mb-4 flex items-center">
                    <BookIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    阅读偏好
                  </h2>
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-800 font-medium">文学小说</span>
                        <span className="text-green-700">90%</span>
                      </div>
                      <div className="h-1.5 md:h-2 bg-gray-100 rounded-full">
                        <div className="h-full bg-green-700 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-800 font-medium">历史传记</span>
                        <span className="text-green-700">75%</span>
                      </div>
                      <div className="h-1.5 md:h-2 bg-gray-100 rounded-full">
                        <div className="h-full bg-green-700 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-800 font-medium">哲学思想</span>
                        <span className="text-green-700">80%</span>
                      </div>
                      <div className="h-1.5 md:h-2 bg-gray-100 rounded-full">
                        <div className="h-full bg-green-700 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-800 font-medium">科技科普</span>
                        <span className="text-green-700">65%</span>
                      </div>
                      <div className="h-1.5 md:h-2 bg-gray-100 rounded-full">
                        <div className="h-full bg-green-700 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-3 md:mb-4 flex items-center">
                    <HeartIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    兴趣爱好
                  </h2>
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <div className="flex flex-col items-center p-2 md:p-3 bg-gray-50 rounded-lg border border-green-100">
                      <img src="https://nocode.meituan.com/photo/search?keyword=reading,books&width=60&height=60" alt="阅读" className="w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2 mx-auto object-cover" />
                      <span className="text-xs md:text-sm text-gray-800">阅读</span>
                    </div>
                    <div className="flex flex-col items-center p-2 md:p-3 bg-gray-50 rounded-lg border border-green-100">
                      <img src="https://nocode.meituan.com/photo/search?keyword=writing,pen&width=60&height=60" alt="写作" className="w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2 mx-auto object-cover" />
                      <span className="text-xs md:text-sm text-gray-800">写作</span>
                    </div>
                    <div className="flex flex-col items-center p-2 md:p-3 bg-gray-50 rounded-lg border border-green-100">
                      <img src="https://nocode.meituan.com/photo/search?keyword=travel,map&width=60&height=60" alt="旅行" className="w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2 mx-auto object-cover" />
                      <span className="text-xs md:text-sm text-gray-800">旅行</span>
                    </div>
                    <div className="flex flex-col items-center p-2 md:p-3 bg-gray-50 rounded-lg border border-green-100">
                      <img src="https://nocode.meituan.com/photo/search?keyword=photography,camera&width=60&height=60" alt="摄影" className="w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2 mx-auto object-cover" />
                      <span className="text-xs md:text-sm text-gray-800">摄影</span>
                    </div>
                    <div className="flex flex-col items-center p-2 md:p-3 bg-gray-50 rounded-lg border border-green-100">
                      <img src="https://nocode.meituan.com/photo/search?keyword=cooking,food&width=60&height=60" alt="烹饪" className="w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2 mx-auto object-cover" />
                      <span className="text-xs md:text-sm text-gray-800">烹饪</span>
                    </div>
                    <div className="flex flex-col items-center p-2 md:p-3 bg-gray-50 rounded-lg border border-green-100">
                      <img src="https://nocode.meituan.com/photo/search?keyword=hiking,mountain&width=60&height=60" alt="徒步" className="w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2 mx-auto object-cover" />
                      <span className="text-xs md:text-sm text-gray-800">徒步</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-3 md:mb-4">我的阅读历程</h2>
              <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
                <div className="flex">
                  <div className="mr-3 md:mr-4">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-700"></div>
                    <div className="w-0.5 h-full bg-gray-100 ml-[5px] md:ml-[7px]"></div>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-gray-800">文学评论人</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-1 md:mb-2">某文学网站 | 2020 - 至今</p>
                    <p className="text-xs md:text-sm text-gray-600">定期撰写书评和文学分析，关注当代文学发展动态。</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-3 md:mr-4">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-700"></div>
                    <div className="w-0.5 h-full bg-gray-100 ml-[5px] md:ml-[7px]"></div>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-gray-800">读书会组织者</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-1 md:mb-2">本地社区 | 2018 - 2020</p>
                    <p className="text-xs md:text-sm text-gray-600">组织月度读书会，带领讨论各类文学作品和思想著作。</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-3 md:mr-4">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-700"></div>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-gray-800">独立书店志愿者</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-1 md:mb-2">某独立书店 | 2017 - 2018</p>
                    <p className="text-xs md:text-sm text-gray-600">参与书店活动策划和图书推荐，培养了对不同类型文学的鉴赏能力。</p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-3 md:mb-4">关于我</h2>
              <p className="text-sm md:text-base mb-4 md:mb-6">
                我是一名热爱阅读的文字工作者，专注于文学评论和生活随笔。平时喜欢在咖啡馆安静地阅读，记录生活中的点滴感悟。
              </p>
              <p className="text-sm md:text-base mb-4 md:mb-6">
                除了阅读，我还热爱旅行和摄影，喜欢用镜头记录旅途中的风景和人文。通过这个博客，我希望能够分享我的阅读心得和生活体验，也希望能与志同道合的朋友交流。
              </p>
              <p className="text-sm md:text-base mb-4 md:mb-6">
                我相信阅读不仅是获取知识的途径，更是一种生活方式。每一本书都是一次心灵的旅行，每一次阅读都是与作者的对话。
              </p>
              
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-green-100">
                <h3 className="text-base md:text-lg font-medium text-green-700 mb-3 md:mb-4">我的博客</h3>
                <p className="text-sm md:text-base mb-3 md:mb-4">
                  这个博客主要包含以下几个方面的内容：
                </p>
                <ul className="list-disc pl-5 space-y-1 md:space-y-2 mb-3 md:mb-4 text-sm md:text-base text-gray-600">
                  <li>读书笔记和书评</li>
                  <li>文学和艺术评论</li>
                  <li>旅行见闻和摄影作品</li>
                  <li>生活随笔和个人感悟</li>
                </ul>
                <p className="text-sm md:text-base text-gray-600">
                  希望我的文章能对你有所帮助或启发。如果你有任何问题或想法，欢迎在文章下方留言或通过社交媒体联系我。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
