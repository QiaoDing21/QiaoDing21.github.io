# CSP 内容安全策略详解 - 前端安全的守护者

大家好，今天来聊一聊 CSP（Content Security Policy），这个在前端安全中非常重要的概念。

## 什么是 CSP？

简单来说，CSP 就像是网站的一个保安大哥，它帮我们管理哪些资源可以加载，哪些不能加载。比如说：

-   哪些地方的图片可以展示
-   哪些地方的 JavaScript 可以运行
-   哪些地方的样式可以使用

## 如何启用 CSP？

有两种方式可以启用 CSP：

### 1. 通过 HTTP 响应头（推荐）

```http
Content-Security-Policy: default-src 'self'; img-src *; script-src 'self' trusted.com
```

### 2. 通过 Meta 标签

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src *; script-src 'self' trusted.com" />
```

## CSP 都能管什么？

想象 CSP 是一个安保系统，它可以管理以下几个方面：

### 1. 资源加载控制

```text
default-src：默认规则，相当于保安的基本要求
script-src：JavaScript 相关，控制哪些脚本可以执行
style-src：CSS 相关，控制样式从哪里加载
img-src：图片相关，控制图片从哪里加载
font-src：字体文件，控制字体从哪里加载
connect-src：API 请求相关，控制 AJAX 请求、WebSocket 连接等
frame-src：iframe 相关，控制框架页面从哪里加载
```

### 2. 常用的值

```text
'none'：啥都不允许（最严格）
'self'：只允许当前域名（比较安全）
'unsafe-inline'：允许内联代码（不太安全，但有时候必须）
'unsafe-eval'：允许使用 eval（要慎用）
https:：只允许 HTTPS 加载资源
*.example.com：允许特定域名
```

## 实际应用案例

### 1. 基础安全配置

```http
Content-Security-Policy:
    default-src 'self';                   # 默认只允许当前域名
    script-src 'self' 'unsafe-inline';    # JS 允许内联和当前域名
    style-src 'self' 'unsafe-inline';     # CSS 允许内联和当前域名
    img-src 'self' data: https:;          # 图片允许 HTTPS 和 base64
    font-src 'self' data: https:;         # 字体允许 HTTPS 和 base64
```

### 2. 自动升级 HTTP 到 HTTPS

```http
Content-Security-Policy: upgrade-insecure-requests
```

这个指令特别有用，比如你的网站有很多旧的 HTTP 图片链接，加上这个配置后浏览器会自动尝试用 HTTPS 加载。

## 常见问题和解决方案

### 1. 图片加载失败问题

```javascript
// 如果 HTTPS 加载失败，可以这样处理
const handleImageError = (e) => {
    const img = e.target;
    if (img.src.startsWith("https://")) {
        img.src = img.src.replace("https://", "http://");
    }
};
```

### 2. 第三方资源处理

```http
# 允许特定的第三方资源
Content-Security-Policy:
    script-src 'self' https://analytics.google.com;
    img-src 'self' https://*.cloudfront.net;
```

## 浏览器兼容性

主流浏览器支持情况：

-   Chrome 25+ ✅
-   Firefox 23+ ✅
-   Safari 7+ ✅
-   Edge 14+ ✅
-   IE 10+ ⚠️（部分支持）

特别注意：`upgrade-insecure-requests` 在 IE 中不支持。

## 最佳实践建议

1. **循序渐进**

    - 先用 Report-Only 模式测试
    - 分析违规报告
    - 逐步加强限制

2. **监控处理**

```http
# 添加违规上报
Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-report
```

3. **性能优化**
    - 使用 nonce 替代 unsafe-inline
    - 合理设置缓存策略
    - 避免过于复杂的规则

## 小贴士

1. 开发时可以在控制台看到 CSP 违规信息
2. 可以用 report-uri.io 这样的服务收集违规报告
3. 记得定期检查和更新策略

## 总结

CSP 是一个非常强大的安全工具，正确使用可以大大提升网站安全性。建议：

1. 从宽松的策略开始
2. 逐步收紧限制
3. 持续监控和调整
4. 注意兼容性处理

希望这篇文章能帮助你更好地理解和使用 CSP！如果有问题，欢迎讨论 😊
