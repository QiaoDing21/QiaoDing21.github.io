# React 入门指南

React 是一个用于构建用户界面的 JavaScript 库。本文将帮助你了解 React 的基础概念和核心特性。

## 为什么选择 React？

- **声明式编程**：React 让你可以声明式地描述 UI，使代码更加可预测和易于调试
- **组件化**：构建管理自身状态的封装组件，然后将其组合成复杂的 UI
- **一次学习，随处编写**：无论你现在正在开发什么，都可以把 React 作为技术栈的一部分

## 开始使用

首先需要在项目中安装 React：

```bash
npm install react react-dom
```

然后创建你的第一个组件：

```jsx
function Welcome(props) {
  return <h1>你好, {props.name}</h1>;
}
```

## 核心概念

### 1. JSX

JSX 是 JavaScript 的语法扩展，它允许你在 JavaScript 文件中编写类似 HTML 的代码。

### 2. 组件 & Props

组件允许你将 UI 拆分为独立可复用的代码片段。

### 3. State & 生命周期

State 允许 React 组件随用户操作、网络响应或其他变化而动态更改输出内容。

## 最佳实践

1. 保持组件的单一职责
2. 使用函数组件和 Hooks
3. 适当划分组件层级

## 结语

React 的学习曲线相对平缓，但要成为专家需要大量实践。希望本文能帮助你踏上 React 开发之路！
