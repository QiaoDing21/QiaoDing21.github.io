# Web 无障碍设计指南

Web 无障碍性（Accessibility，简称 a11y）是确保所有人，包括残障人士，都能平等地访问和使用网站的实践。本文将介绍如何设计和开发无障碍的 Web 应用。

## 为什么无障碍性很重要？

- **包容性**：确保所有用户都能访问你的内容
- **法律合规**：许多国家有法律要求网站必须具备无障碍性
- **SEO 优势**：无障碍的网站通常在搜索引擎中表现更好
- **更好的用户体验**：无障碍设计通常会提升所有用户的体验

## WCAG 指南

Web 内容无障碍指南（WCAG）提供了一系列使 Web 内容更易于访问的建议：

### 1. 可感知性

信息和用户界面组件必须以用户可以感知的方式呈现。

#### 文本替代

为非文本内容提供文本替代：

```html
<!-- 好的做法 -->
<img src="logo.png" alt="公司标志" />

<!-- 不好的做法 -->
<img src="logo.png" />
```

#### 多媒体替代

为多媒体内容提供替代方案：

```html
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <track kind="subtitles" src="captions.vtt" srclang="zh" label="中文字幕" />
  您的浏览器不支持视频标签。
</video>
```

### 2. 可操作性

用户界面组件和导航必须是可操作的。

#### 键盘可访问性

确保所有功能可通过键盘使用：

```jsx
<button 
  onClick={handleClick} 
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  tabIndex={0}
>
  点击我
</button>
```

#### 足够的时间

给用户足够的时间阅读和使用内容：

```jsx
function TimedNotification() {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (!visible) return null;
  
  return (
    <div role="alert">
      <p>重要通知 (将在 {timeLeft} 秒后关闭)</p>
      <button onClick={() => setTimeLeft(10)}>延长时间</button>
      <button onClick={() => setVisible(false)}>关闭</button>
    </div>
  );
}
```

### 3. 可理解性

信息和用户界面的操作必须是可理解的。

#### 可预测性

以可预测的方式呈现网页：

```jsx
// 好的做法：表单提交按钮位置一致
<form>
  <div>
    <label htmlFor="name">姓名</label>
    <input id="name" type="text" />
  </div>
  <div>
    <label htmlFor="email">邮箱</label>
    <input id="email" type="email" />
  </div>
  <div>
    <button type="submit">提交</button>
  </div>
</form>
```

#### 输入帮助

帮助用户避免和纠正错误：

```jsx
function FormWithValidation() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const validateEmail = (value) => {
    if (!value) {
      setError('邮箱不能为空');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(value)) {
      setError('请输入有效的邮箱地址');
      return false;
    }
    setError('');
    return true;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      // 提交表单
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">邮箱</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email-error"
          aria-invalid={!!error}
        />
        {error && <p id="email-error" role="alert">{error}</p>}
      </div>
      <button type="submit">提交</button>
    </form>
  );
}
```

### 4. 健壮性

内容必须足够健壮，以便能被各种用户代理（包括辅助技术）可靠地解释。

#### 兼容性

最大化与当前和未来的用户代理（包括辅助技术）的兼容性：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>无障碍网页</title>
</head>
<body>
  <main>
    <h1>主要内容</h1>
    <!-- 使用语义化标签 -->
    <article>
      <h2>文章标题</h2>
      <p>文章内容...</p>
    </article>
  </main>
</body>
</html>
```

## ARIA 属性

可访问性富互联网应用（ARIA）是一组属性，定义了使 Web 内容和应用程序更易于被残障人士访问的方法。

```html
<!-- 使用 ARIA 角色 -->
<div role="navigation">
  <ul>
    <li><a href="/">首页</a></li>
    <li><a href="/about">关于</a></li>
  </ul>
</div>

<!-- 使用 ARIA 状态和属性 -->
<button 
  aria-pressed="false" 
  aria-label="展开菜单"
  onClick="toggleMenu()"
>
  菜单
</button>

<!-- 使用 ARIA 实时区域 -->
<div aria-live="polite" aria-atomic="true">
  <p>新消息将显示在这里</p>
</div>
```

## 测试无障碍性

### 自动化测试工具

- Lighthouse
- axe-core
- WAVE

### 手动测试

- 键盘导航测试
- 屏幕阅读器测试（如 NVDA、VoiceOver）
- 高对比度模式测试

## 实践建议

1. **从设计阶段就考虑无障碍性**
2. **使用语义化 HTML**
3. **提供足够的颜色对比度**
4. **不仅依赖颜色传达信息**
5. **确保表单元素有关联的标签**
6. **提供明确的反馈和错误信息**
7. **测试不同的辅助技术**

## 总结

Web 无障碍性不仅是一种技术实践，更是一种包容性思维。通过遵循 WCAG 指南和使用 ARIA 属性，我们可以创建更加包容、可访问的 Web 体验，让所有人都能平等地获取信息和服务。
