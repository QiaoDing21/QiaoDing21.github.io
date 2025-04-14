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
              src="https://s21.ax1x.com/2025/04/14/pEW0TfO.jpg" 
              alt="封面图案" 
              className="w-full h-full object-cover mix-blend-overlay opacity-30"
            />
            <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 flex justify-center">
              <img 
                src="https://s21.ax1x.com/2025/04/11/pERE99H.png" 
                alt="个人头像" 
                className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>
          
          <div className="pt-16 md:pt-24 p-4 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">乔丁</h1>
              <p className="text-base md:text-lg text-gray-600">阳光开朗NPC</p>
              
              {/* <div className="flex justify-center space-x-3 md:space-x-4 mt-4">
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
              </div> */}
            </div>
            
            <div className="prose prose-sm md:prose-lg max-w-none">
              <p className="text-center mb-6 md:mb-8">
                有时候会突发恶疾，随便记录一下乱七八糟的话
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
                {/* <div>
                  <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-3 md:mb-4 flex items-center">
                    <BookIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    爱好
                  </h2>
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-800 font-medium">篮球</span>
                        <span className="text-green-700">80%</span>
                      </div>
                      <div className="h-1.5 md:h-2 bg-gray-100 rounded-full">
                        <div className="h-full bg-green-700 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-800 font-medium">编程</span>
                        <span className="text-green-700">60%</span>
                      </div>
                      <div className="h-1.5 md:h-2 bg-gray-100 rounded-full">
                        <div className="h-full bg-green-700 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-800 font-medium">躺平</span>
                        <span className="text-green-700">100%</span>
                      </div>
                      <div className="h-1.5 md:h-2 bg-gray-100 rounded-full">
                        <div className="h-full bg-green-700 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div> */}
                
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-3 md:mb-4 flex items-center">
                    <HeartIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    兴趣爱好
                  </h2>
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <div className="flex flex-col items-center p-2 md:p-3 bg-gray-50 rounded-lg border border-green-100">
                      <img src="https://nocode.meituan.com/photo/search?keyword=reading,books&width=60&height=60" alt="阅读" className="w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2 mx-auto object-cover" />
                      <span className="text-xs md:text-sm text-gray-800">篮球</span>
                    </div>
                    <div className="flex flex-col items-center p-2 md:p-3 bg-gray-50 rounded-lg border border-green-100">
                      <img src="https://nocode.meituan.com/photo/search?keyword=writing,pen&width=60&height=60" alt="写作" className="w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2 mx-auto object-cover" />
                      <span className="text-xs md:text-sm text-gray-800">编程</span>
                    </div>
                    <div className="flex flex-col items-center p-2 md:p-3 bg-gray-50 rounded-lg border border-green-100">
                      <img src="https://nocode.meituan.com/photo/search?keyword=travel,map&width=60&height=60" alt="旅行" className="w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2 mx-auto object-cover" />
                      <span className="text-xs md:text-sm text-gray-800">旅行</span>
                    </div>
                    <div className="flex flex-col items-center p-2 md:p-3 bg-gray-50 rounded-lg border border-green-100">
                      <img src="https://nocode.meituan.com/photo/search?keyword=photography,camera&width=60&height=60" alt="摄影" className="w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2 mx-auto object-cover" />
                      <span className="text-xs md:text-sm text-gray-800">躺平</span>
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
              
              <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-3 md:mb-4">我的简历</h2>
              <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
                <div className="flex">
                  <div className="mr-3 md:mr-4">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-700"></div>
                    <div className="w-0.5 h-full bg-gray-100 ml-[5px] md:ml-[7px]"></div>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-gray-800">美团</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-1 md:mb-2">外卖广告 | 2019 - 2025</p>
                    <p className="text-xs md:text-sm text-gray-600">商业增值前端 - 营销广告</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-3 md:mr-4">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-700"></div>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-gray-800">西安邮电大学</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-1 md:mb-2">计算机 | 2015 - 2019</p>
                    <p className="text-xs md:text-sm text-gray-600">移动应用开发实验室 - web前端</p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-3 md:mb-4">关于我</h2>
              <p className="text-sm md:text-base mb-4 md:mb-6">
                普通前端开发，爱打篮球。
              </p>
              {/* <p className="text-sm md:text-base mb-4 md:mb-6">
                除了阅读，我还热爱旅行和摄影，喜欢用镜头记录旅途中的风景和人文。通过这个博客，我希望能够分享我的阅读心得和生活体验，也希望能与志同道合的朋友交流。
              </p>
              <p className="text-sm md:text-base mb-4 md:mb-6">
                我相信阅读不仅是获取知识的途径，更是一种生活方式。每一本书都是一次心灵的旅行，每一次阅读都是与作者的对话。
              </p> */}
              
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-green-100">
                <h3 className="text-base md:text-lg font-medium text-green-700 mb-3 md:mb-4">我的博客</h3>
                <p className="text-sm md:text-base mb-3 md:mb-4">
                  这个博客主要包含以下几个方面的内容：
                </p>
                <ul className="list-disc pl-5 space-y-1 md:space-y-2 mb-3 md:mb-4 text-sm md:text-base text-gray-600">
                  <li>技术八股文</li>
                  <li>突发恶疾的疯言疯语</li>
                </ul>
                <p className="text-sm md:text-base text-gray-600">
                  希望我的文章能对你有所帮助或启发。如果你有任何问题或想法，欢迎举报一下该站点。
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
