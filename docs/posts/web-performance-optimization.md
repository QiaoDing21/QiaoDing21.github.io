# Web 性能优化实践

性能优化是前端开发中的重要话题，本文将分享一些实用的优化技巧。

## 加载优化

### 1. 资源压缩

- 使用 webpack、rollup 等工具压缩代码
- 开启 gzip 压缩
- 图片优化（压缩、适当格式）

### 2. 懒加载

```javascript
// 路由懒加载
const Home = React.lazy(() => import('./Home'));

// 图片懒加载
<img loading="lazy" src="image.jpg" alt="懒加载图片" />
```

## 运行时优化

### 1. 虚拟列表

处理大量数据时，使用虚拟列表优化性能：

```jsx
function VirtualList({ items }) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleItems = items.slice(startIndex, startIndex + 10);
  
  return (
    <div className="list-container">
      {visibleItems.map(item => (
        <div key={item.id}>{item.content}</div>
      ))}
    </div>
  );
}
```

### 2. 防抖和节流

```javascript
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  }
}
```

## 缓存策略

1. 浏览器缓存
2. Service Worker
3. Memory Cache
4. Disk Cache

## 监控与分析

- Performance API
- Lighthouse
- Chrome DevTools

## 总结

性能优化是一个持续的过程，需要根据实际情况选择合适的优化策略。
