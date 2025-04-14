# TypeScript 进阶之路

TypeScript 是 JavaScript 的超集，它添加了可选的静态类型和基于类的面向对象编程。

## 高级类型系统

### 联合类型和交叉类型

```typescript
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// 交叉类型
type ElevatedEmployee = Admin & Employee;

// 联合类型
type ComplexType = string | number;
```

### 泛型

泛型是 TypeScript 最强大的特性之一：

```typescript
function identity<T>(arg: T): T {
  return arg;
}

// 使用
let output = identity<string>("myString");
```

## 装饰器

装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、访问符、属性或参数上。

```typescript
function log(target: any, propertyKey: string) {
  console.log(`Accessing property: ${propertyKey}`);
}

class Example {
  @log
  name: string;
}
```

## 工具类型

TypeScript 提供了多个工具类型：

- `Partial<T>`
- `Readonly<T>`
- `Pick<T, K>`
- `Record<K, T>`

## 最佳实践

1. 始终启用严格模式
2. 避免使用 any
3. 充分利用类型推断
4. 使用接口定义对象结构

## 总结

掌握这些高级特性将帮助你更好地利用 TypeScript 的类型系统，编写更安全、可维护的代码。
