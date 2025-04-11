# React Hooks 完全指南

React Hooks 是 React 16.8 引入的新特性，它让你在不编写 class 的情况下使用 state 和其他 React 特性。本文将深入探讨 React Hooks 的使用方法和最佳实践。

## 为什么使用 Hooks？

- **更简洁的代码**：减少了类组件中的样板代码
- **更容易复用状态逻辑**：自定义 Hook 可以在不同组件间共享逻辑
- **关注点分离**：相关的逻辑可以放在一起，而不是分散在不同的生命周期方法中

## 基础 Hooks

### useState

`useState` 是最基本的 Hook，它让函数组件拥有自己的状态。

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}
```

### useEffect

`useEffect` 让你在函数组件中执行副作用操作，如数据获取、订阅或手动更改 DOM。

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 类似于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    document.title = `你点击了 ${count} 次`;
  });

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}
```

### useContext

`useContext` 接收一个 context 对象并返回该 context 的当前值。

```jsx
import React, { useContext } from 'react';

const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>按钮</button>;
}
```

## 额外的 Hooks

### useReducer

`useReducer` 是 `useState` 的替代方案，适用于复杂的状态逻辑。

```jsx
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```

### useMemo 和 useCallback

这两个 Hook 用于性能优化：

```jsx
import React, { useState, useMemo, useCallback } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  
  // 只有当 count 改变时，才会重新计算
  const expensiveComputation = useMemo(() => {
    return computeExpensiveValue(count);
  }, [count]);
  
  // 只有当 count 改变时，才会创建新的回调函数
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  
  return (
    <div>
      <p>{expensiveComputation}</p>
      <button onClick={handleClick}>增加</button>
    </div>
  );
}
```

## 自定义 Hooks

自定义 Hook 是一种复用状态逻辑的机制，它不复用 state 本身，而是复用状态逻辑。

```jsx
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// 使用自定义 Hook
function WindowSizeComponent() {
  const windowSize = useWindowSize();
  return (
    <div>
      窗口宽度: {windowSize.width}px, 高度: {windowSize.height}px
    </div>
  );
}
```

## Hooks 使用规则

1. 只在最顶层使用 Hooks，不要在循环、条件或嵌套函数中调用 Hook
2. 只在 React 函数组件中调用 Hooks，不要在普通 JavaScript 函数中调用

## 总结

React Hooks 为函数组件带来了强大的能力，使我们能够编写更简洁、可复用的代码。通过掌握这些基础和高级 Hooks，你可以更有效地构建 React 应用。
