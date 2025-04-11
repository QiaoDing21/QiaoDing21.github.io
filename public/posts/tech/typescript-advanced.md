# TypeScript 高级特性详解

TypeScript 作为 JavaScript 的超集，提供了许多强大的类型系统特性。本文将深入探讨一些高级特性，帮助你更好地利用 TypeScript 的类型系统。

## 条件类型

条件类型允许我们根据类型关系来选择不同的类型：

```typescript
type IsString<T> = T extends string ? true : false;

// 使用
type A = IsString<string>; // true
type B = IsString<number>; // false
```

## 映射类型

映射类型允许我们基于旧类型创建新类型：

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Person {
  name: string;
  age: number;
}

// 创建一个所有属性都是只读的新类型
type ReadonlyPerson = Readonly<Person>;
```

## 类型推断与类型保护

TypeScript 提供了多种类型保护机制：

```typescript
function isString(value: any): value is string {
  return typeof value === 'string';
}

function example(value: string | number) {
  if (isString(value)) {
    // 在这个块中，TypeScript 知道 value 是 string 类型
    return value.toUpperCase();
  }
  // 在这个块中，TypeScript 知道 value 是 number 类型
  return value.toFixed(2);
}
```

## 高级泛型模式

### 泛型约束

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // 现在我们知道 arg 有 length 属性
  return arg;
}
```

### 泛型默认值

```typescript
interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

// 不指定类型参数时使用默认值
const response: ApiResponse = {
  data: { name: "张三" },
  status: 200,
  message: "成功"
};
```

## 高级类型操作

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

// 交叉类型：同时具有 Admin 和 Employee 的所有属性
type ElevatedEmployee = Admin & Employee;

// 联合类型：可以是 Admin 或 Employee
type Person = Admin | Employee;
```

### 索引类型和映射类型结合

```typescript
type PickByValueType<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? K : never]: T[K]
};

interface Person {
  name: string;
  age: number;
  isActive: boolean;
}

// 只选择 Person 中类型为 string 的属性
type StringProps = PickByValueType<Person, string>; // { name: string }
```

## 装饰器

TypeScript 实现了装饰器，这是一种特殊类型的声明，可以附加到类声明、方法、访问器、属性或参数上：

```typescript
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`调用 ${key} 方法，参数：`, args);
    return original.apply(this, args);
  };
  
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number) {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(1, 2); // 输出: "调用 add 方法，参数：[1, 2]"
```

## 工具类型

TypeScript 内置了许多有用的工具类型：

```typescript
// 将所有属性变为可选
type Partial<T> = { [P in keyof T]?: T[P] };

// 将所有属性变为必需
type Required<T> = { [P in keyof T]-?: T[P] };

// 将所有属性变为只读
type Readonly<T> = { readonly [P in keyof T]: T[P] };

// 从 T 中选择一组属性 K
type Pick<T, K extends keyof T> = { [P in K]: T[P] };

// 从 T 中排除可以赋值给 U 的类型
type Exclude<T, U> = T extends U ? never : T;

// 提取可以赋值给 U 的类型
type Extract<T, U> = T extends U ? T : never;

// 排除 T 中的 null 和 undefined
type NonNullable<T> = T extends null | undefined ? never : T;
```

## 模块增强

TypeScript 允许我们扩展现有模块的类型定义：

```typescript
// 原始定义
declare module "some-library" {
  export function someFunction(): void;
}

// 增强定义
declare module "some-library" {
  export function newFunction(): void;
}
```

## 总结

TypeScript 的类型系统非常强大，掌握这些高级特性可以帮助你编写更安全、更可维护的代码。通过合理使用条件类型、映射类型、泛型和工具类型，你可以构建出更加健壮的应用程序。
