# HTTP 响应报文详解

HTTP 响应报文由三部分组成：响应行、响应头、响应体

## 响应行

### 状态码分类

-   1xx：消息 - 请求已接收，继续处理中
-   2xx：成功 - 请求已成功被服务器接收、理解、接受
-   3xx：重定向 - 需要后续操作才能完成请求
-   4xx：客户端错误 - 请求包含语法错误或无法完成请求
-   5xx：服务器错误 - 服务器在处理请求时发生错误

### 常见状态码

-   200 OK：请求成功
-   304 Not Modified：资源未修改，可使用缓存
-   404 Not Found：请求的资源不存在
-   500 Internal Server Error：服务器内部错误

## 响应头

### 主要响应头字段

1. Cache-Control

    - 控制响应内容的缓存机制
    - 服务端告知客户端如何缓存资源

2. ETag

    - 资源的唯一标识符
    - 用于验证资源是否变化
    - 配合缓存机制使用

3. Set-Cookie
    - 服务器设置客户端 Cookie 的机制
    - 可设置 HttpOnly 等属性增强安全性

## URL 解析过程

### URL 组成部分

1. protocol：传输协议（如 HTTP）
2. host：主机名或 IP 地址
3. port：端口号
4. path：访问路径
5. query：查询参数
6. fragment：片段标识符

### 页面加载流程

1. 浏览器查询缓存
2. DNS 解析获取 IP
3. 建立 TCP 连接
4. 发送 HTTP 请求
5. 接收响应
6. 解析渲染页面

### 页面加载事件

-   ready：DOM 加载完成
-   onload：所有资源加载完成

## 网络协议层次

### 协议层级

应用层 → 传输层 → 网络层 → 链路层

### IP 协议

-   功能：数据包传送
-   要素：IP 地址和 MAC 地址
-   ARP 协议：IP 地址解析为 MAC 地址

### TCP 协议

-   特点：可靠的字节流服务
-   三次握手过程
    1. 客户端发送 SYN
    2. 服务端回应 SYN/ACK
    3. 客户端发送 ACK

### HTTP 协议

-   持久连接（HTTP/1.1 特性）
-   管线化请求
-   内容协商机制
    1. 服务器驱动协商
    2. 客户端驱动协商
    3. 透明协商

## HTTP 缓存控制

### HTTP/1.0 缓存机制

-   Pragma
-   Expires
-   If-Modified-Since/Last-Modified

### HTTP/1.1 缓存机制

-   Cache-Control
    -   no-cache
    -   max-age
-   If-None-Match/ETag
