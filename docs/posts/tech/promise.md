## Promise 的含义

所谓 Promise，就是一个对象，用来传递异步传递消息的操作。
Promise 有两种特点：
1、对象的状态不受外界影响。Promise 对象代表一个异步操作。**有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）**。只有异步操作的结果可以决定当前是哪一种状态，人恶化其他操作都无法改变这个状态。
2、一旦状态改变就不再改变。Promise 对象的状态改变**只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected**。只要其中之一发生，状态就会凝固，不再改变。再添加回调函数，也会立即得到这个结果。与事件不同，事件如果错过，再去监听也得不到结果。

有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调。Promise 对象提供统一接口，使得控制异步操作更加容易。

> Promise 的缺点：
> 1、无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
> 2、如果不设置回调函数，Promise 内部抛出的错误不会反应到外部。
> 3、当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。Pending 时有可能是刚 newPromise 对象，也可能是等待回调操作

**在一个 promise 链中，只要任何一个 promise 被 reject，promise 链就被破坏了，reject 之后的 promise 都不会再执行，而是直接调用.catch 方法。**

如果某些时间不断的反复发生，一般来说，使用 stream 模式是比部署 Promise 更好的选择。

## Promise 基本用法

ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例

```javascript
var promise = new Promise(function(resolve, reject){
	// some code
	if(/*异步操作成功*/){
		resolve(value);
	}else{
		reject(error);
	}
});
```

promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

**resolve**：resolve 函数的作用是，将 Promise 对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。

**reject**：reject 函数的作用是，将 Promise 对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去

Promise 实例生成以后，可以用**then 方法**分别指定 resolved 状态和 rejected 状态的回调函数。

```javascript
promise.then(
    function (value) {
        // success
    },
    function (error) {
        // failure
    }
);
```

then 方法可以接受两个回调函数作为参数。第一个回调函数是 Promise 对象的状态变为 resolved 时调用，第二个回调函数是 Promise 对象的状态变为 rejected 时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受 Promise 对象传出的值作为参数。
_如果紧跟的 then 没有声明 onRejected 回调，则传给下一个 then|catch 的 onRejected，一直都没有，会报 Uncaught 错误_
如果 resolve 的参数是 Promise 对象，且该 Promise 对象后面没有跟 then，则该对象的 resolve|reject 会触发外层 Promise 对象后续的 then 的 onFulfilled|onRejected

```javascript
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, "done"); //第三个参数是前面函数要传入的参数
    });
}

timeout(100).then((value) => {
    console.log(value);
}); // done
```

上面代码中，timeout 方法返回一个 Promise 实例，表示一段时间以后才会发生的结果。过了指定的时间（ms 参数）以后，Promise 实例的状态变为 resolved，就会触发 then 方法绑定的回调函数。

异步加载图片的例子

```javascript
function loadImageAsync(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => {
            resolve(image);
        };

        image.onerror = function () {
            reject(new Error("Could not load image at " + url));
        };

        image.src = url;
    });
}
```

上面代码中，使用 Promise 包装了一个图片加载的异步操作。如果加载成功，就调用 resolve 方法，否则就调用 reject 方法。

下面是一个用 Promise 对象实现的 Ajax 操作的例子。

```javascript
const getJSON = function (url) {
    const promise = new Promise(function (resolve, reject) {
        const handler = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
        const client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
    });
    return promise;
};

getJSON("/posts.json").then(
    function (json) {
        console.log("Contents: " + json);
    },
    function (error) {
        console.error("出错了", error);
    }
);
```

上面代码中，getJSON 是对 XMLHttpRequest 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且返回一个 Promise 对象。需要注意的是，在 getJSON 内部，resolve 函数和 reject 函数调用时，都带有参数。

如果调用 resolve 函数和 reject 函数时带有参数，那么它们的参数会被传递给回调函数。reject 函数的参数通常是 Error 对象的实例，表示抛出的错误；resolve 函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。

```javascript
const p1 = new Promise(function (resolve, reject) {
    // ...
});

const p2 = new Promise(function (resolve, reject) {
    // ...
    resolve(p1);
});
```

上面代码中，p1 和 p2 都是 Promise 的实例，但是 p2 的 resolve 方法将 p1 作为参数，即一个异步操作的结果是返回另一个异步操作。

注意，这时 p1 的状态就会传递给 p2，也就是说，p1 的状态决定了 p2 的状态。如果 p1 的状态是 pending，那么 p2 的回调函数就会**等待 p1 的状态改变**；如果 p1 的状态已经是 resolved 或者 rejected，那么 p2 的回调函数将会**立刻执行**。

```javascript
var p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error("fail")), 3000);
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 1000);
});
p2.then((result) => console.log(result));
p2.catch((error) => console.log(error));
//Error: fail
```

上面的代码中，p1 是一个 Promise，3 秒之后变为 Rejected。p2 的状态由 p1 决定，1 秒之后，p2 调用 resolve 方法，但是此时 p1 的状态还没有改变，因此 p2 的状态也不改变。又过了 2 秒，p1 变为 Rejected，p2 也跟着变为 Rejected。

## Promise.prototype.then()

Promise 实例具有 then 方法。也就是说，then 方法是定义在原型对象 Promise.prototype 上的。他的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then 方法的第一个参数是 Resolved 状态的回调函数，第二个参数（可选）是 Rejected 状态的回调函数。

then 方法返回的是一个新的 Promise 实例（不是原来那个）。因此可以采用链式写法，即 then 方法后面再调用另一个 then 方法

```javascript
getJSON("/post.json")
    .then(function (json) {
        return json.post;
    })
    .then(function (post) {
        // ...
    });
```

上面的代码使用 then 方法依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数传入第二个回调函数。
采用链式的 then 可以指定一组按照次序调用的回调函数。这时，前一个回调函数有可能返回的还是一个 Promise 对象（即有异步操作），而后一个回调函数就会等待该 Promise 对象的状态发生变化，在被调用。

```javascript
getJSON("/post/1.json")
    .then(function (post) {
        return getJSON(post.commentURL);
    })
    .then(
        function funcA(comments) {
            console.log("Resolved: ", comments);
        },
        function funcB(err) {
            console.log("Rejected: ", err);
        }
    );
```

上面的代码中，第一个 then 方法指定的回调函数返回的是**另一个 Promise 对象**。这时，第二个 then 方法指定的回调函数就会等待这个新的 Promise 对象状态发生变化。如果变为 Resolved，就调用 funcA；如果状态变为 Rejected，就调用 funcB。

用箭头函数写上面的代码

```javascript
getJSON("/post/1.json").then(
	post => getJSON(post.commentURL);
).then(
	comments => console.log("Resolved: ", comments);
	err      => console.log("Rejected: ", err);
)
```

## Promise.prototype.catch()

Promise.prototype.catch 方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。

```javascript
getJSON("/posts.json")
    .then(function (posts) {
        // ...
    })
    .catch(function (error) {
        // 处理 getJSON 和 前一个回调函数运行时发生的错误
        console.log("发生错误！", error);
    });
```

上面代码中，getJSON 方法返回一个 Promise 对象，如果该对象状态变为 resolved，则会调用 then 方法指定的回调函数；如果异步操作抛出错误，状态就会变为 rejected，**就会调用 catch 方法指定的回调函数**，处理这个错误。另外，then 方法指定的回调函数，如果运行中抛出错误，也会被 catch 方法捕获。

### 1、如果 Promise 状态已经变成 Resolved，再抛出错误是无效的。

```javascript
var promise = new Promise(function (resolve, rejected) {
    resolve("ok");
    throw new Error("test");
});
promise
    .then(function (value) {
        console.log(value);
    })
    .catch(function (error) {
        console.log(error);
    });
// ok
```

由于 Promise 在 resolve 语句后再抛出错误，并不会被捕获，等于没抛出

### 2、Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获位置。错误总会被下一个的 catch 语句捕获

```javascript
getJSON("/post/1.json")
    .then(function (post) {
        return getJSON(post.commentURL);
    })
    .then(function (comments) {
        // some code
    })
    .catch(function (error) {
        // 处理前面三个Promise产生的错误
    });
```

代码中一共有三个 Promise 对象：一个由 getJSON 产生，两个由 then 产生。其中任何一个抛出的错误都会被最后一个 catch 捕获

### 3、不要在 then 方法里定义 Rejected 状态的回调函数（即 then 产生的第二个参数），而应该总是使用 catch

```javascript
promise.then(
    function (data) {
        // success
    },
    function (err) {
        // error
    }
);
promise
    .then(function (data) {
        // suceess
    })
    .catch(function (err) {
        // error
    });
```

第二种方法更好，因为前者更接近同步的写法（try/catch）

### 4、跟传统的 try/catch 不同的是，如果没哟使用 catch 方法指定错误处理的回调函数 Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

```javascript
var someAsyncThing = function () {
    return new Promise(function (resolve, reject) {
        resolve(x + 2); // x没有声明
    });
};
someAsyncThing().then(function () {
    console.log("everything is great");
});
```

someAsyncThing 函数产生的 Promise 对象会报错，但是由于没有指定 catch 方法，因而这个错误不会被捕获，也不会传递到外层代码，导致运行后**没有结果**

```javascript
var promise = new Promise(function (resolve, reject) {
    resolve("ok");
    setTimeout(function () {
        throw new Error("test");
    }, 0);
});
promise.then(function (value) {
    console.log(value);
});
// ok
// Uncaught Error: test
```

上面的代码中，Promise 指定在下一轮“事件循环”再抛出错误，结果由于没有指定使用 try...catch 语句，就冒泡到最外层，成了未捕获的错误。因此此时 Promise 的函数体已经运行结束，所以这个错误是在 Promise 外抛出的。
Node.js 有一个专门监听未捕获的 Rejected 错误。

### 5、catch 方法返回的还是一个 Promise 对象，因此后面还可以接着调用 then 方法。

```javascript
var someAsyncThing = function(){
	return new Promise(function(resolve, reject){
		resolve(x + 2); // x未声明
	})；
}；
someAsyncThing()
	.catch(function(error){
		console.log(error)
	})
	.then(function(){
		console.log("carry no")
	});
// [ReferenceError: x is not defined]
// carry on
```

代码中运行完 catch 方法指定的回调函数，会接着运行后面那个 then 方法指定的回调函数

### 6、如果没有报错，就会跳过 catch 方法

```javascript
Promise.resolve()
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        console.log("carry on");
    });
//carry on
```

代码因为没有报错而跳过了 catch 方法，直接执行了后面的 then 方法。此时要是 then 方法里报错，就与前面的 catch 无关了

### 7、catch 方法中还能再抛出错误

```javascript
const someAsyncThing = function () {
    return new Promise(function (resolve, reject) {
        // 下面一行会报错，因为x没有声明
        resolve(x + 2);
    });
};

someAsyncThing()
    .then(function () {
        return someOtherAsyncThing();
    })
    .catch(function (error) {
        console.log("oh no", error);
        // 下面一行会报错，因为 y 没有声明
        y + 2;
    })
    .then(function () {
        console.log("carry on");
    });
// oh no [ReferenceError: x is not defined]
```

上面代码中，catch 方法抛出一个错误，因为后面没有别的 catch 方法了，导致这个错误不会被捕获，也不会传递到外层。如果改写一下，结果就不一样了。

```javascript
someAsyncThing()
    .then(function () {
        return someOtherAsyncThing();
    })
    .catch(function (error) {
        console.log("oh no", error);
        // 下面一行会报错，因为y没有声明
        y + 2;
    })
    .catch(function (error) {
        console.log("carry on", error);
    });
// oh no [ReferenceError: x is not defined]
// carry on [ReferenceError: y is not defined]
```

上面代码中，第二个 catch 方法用来捕获，前一个 catch 方法抛出的错误。

### Promise.all()

Promise.all 方法用于将多个 Promise 实例包装成一个新的 Promise 实例

```javascript
var p = Promise.all([p1, p2, p3]);
```

代码中，Promise.all 方法接受一个数组作为参数，p1、p2、p3 都是 Promise 对象的实例；如果不是，就会先调用 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理。
Promise.all 方法的参数不一定是数组，但是必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例
p 的状态由 p1、p2、p3 决定，分为两种情况

> （1）只有 p1、p2、p3 的状态都变为 Fulfilled，p 的状态才会变为 Fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数
> （2）只要 p1、p2、p3 中有一个被 Rejected，p 的状态就变成 Rejected，此时第一个被 Rejected 的实例的返回值会传递给 p 的回调函数

```javascript
// 生成一个Promise对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
    return getJSON("/post/" + id + ".json");
});

Promise.all(promises)
    .then(function (posts) {
        // ...
    })
    .catch(function (reason) {
        // ...
    });
```

```javascript
const databasePromise = connectDatabase();

const booksPromise = databasePromise.then(findAllBooks);

const userPromise = databasePromise.then(getCurrentUser);

Promise.all([booksPromise, userPromise]).then(([books, user]) => pickTopRecommentations(books, user));
```

上面代码中，booksPromise 和 userPromise 是两个异步操作，只有等到它们的结果都返回了，才会触发 pickTopRecommentations 这个回调函数。

注意，如果作为参数的 Promise 实例，自己定义了 catch 方法，那么它一旦被 rejected，并不会触发 Promise.all()的 catch 方法。

```javascript
const p1 = new Promise((resolve, reject) => {
    resolve("hello");
})
    .then((result) => result)
    .catch((e) => e);

const p2 = new Promise((resolve, reject) => {
    throw new Error("报错了");
})
    .then((result) => result)
    .catch((e) => e);

Promise.all([p1, p2])
    .then((result) => console.log(result))
    .catch((e) => console.log(e));
// ["hello", Error: 报错了]
```

上面代码中，p1 会 resolved，p2 首先会 rejected，但是 p2 有自己的 catch 方法，该方法返回的是一个新的 Promise 实例，p2 指向的实际上是这个实例。该实例执行完 catch 方法后，也会变成 resolved，导致 Promise.all()方法参数里面的两个实例都会 resolved，因此会调用 then 方法指定的回调函数，而不会调用 catch 方法指定的回调函数。

如果 p2 没有自己的 catch 方法，就会调用 Promise.all()的 catch 方法。

```javascript
const p1 = new Promise((resolve, reject) => {
    resolve("hello");
}).then((result) => result);

const p2 = new Promise((resolve, reject) => {
    throw new Error("报错了");
}).then((result) => result);

Promise.all([p1, p2])
    .then((result) => console.log(result))
    .catch((e) => console.log(e));
// Error: 报错了
```

## Promise.race()

Promise.race 方法同样是将多个 Promise 实例包装成一个新的 Promise 实例

```javascript
var p = Promise.race([p1, p2, p3]);
```

上面代码中，只要 p1、p2、p3 中有一个实例率先改变状态，p 的状态就跟着改变。哪个率先改变的 Promise 实例的返回值，就传递给 p 的回调函数。

Promise.race 方法的参数和 Promise.all 方法一样，如果不是 Promise 实例，就会先调用 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理

如果指定时间内没有获得结果，就将 Promise 的状态变为 Rejected，否则变为 Resolved

```javascript
var p = Promise.race([
    fetch("/that-a-while"),
    new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error("request timeout")), 5000);
    }),
]);
p.then((respones) => console.log(response));
p.catch((error) => console.log(error));
```

上面的代码中，如果 5 秒之内 fetch 方法无法返回结果，变量 p 的状态就会变为 Rejected，从而触发 catch 方法指定的回调函数

## Promise.resolve()

**有时需要将现有对象转为 Promise 对象，Promise.resolve 方法就起到这个作用**

```javascript
var jsPromise = Promise.resolve($.ajax("/whatever.json"));
```

代码将 jQuery 生成的 deferred 对象转为新的 Promise 对象
Promise.resolve 等价于下面的写法

```javascript
Promise.resolve("foo");
// 等价于
new Promise((resolve) => resolve("foo"));
```

如果 Promise.resolve 方法的参数不是具有 then 方法的对象，则返回一个新的 Promise 对象，且其状态为 Resolved。

```javascript
var p = Promise.resolve("Hello");
p.then(function (s) {
    console.log(s);
});
// hello
```

上面的代码生成了一个新的 Promise 对象的实例 p。由于字符串“hello”不属于异步操作（判断方法是它不是具有 then 方法的对象），返回 Promise 实例的状态从一生成就是 Resolved，所以回调函数就会立即执行。Promise.resolve 方法的参数会同时传给回调函数。
Promise.resolve 方法允许调用时不带参数。所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用 Promise.resolve 方法。

```javascript
var p = Promise.resolve();
p.then(function () {
    // ...
});
```

上面的变量 p 就是一个 Promise 对象
如果 Promise.resolve 方法的参数是一个 Promise 实例，则会被原封不动地返回。

## Promise.reject()

Promise.reject(reason)方法也会返回一个新的 Promise 实例，状态为 Rejected。Promise.reject 方法的参数 reason 会被传递给实例的回调函数。

```javascript
var p = Promise.reject("err");
//等同于
var p = new Promise((resolve, reject) => reject("foo"));
p.then(null, function (s) {
    console.log(s);
});
//err
```

代码生成一个 Promise 对象的实例 p，状态为 Rejected，回调函数会立即执行。

## 附加 done 和 finally

### done()

Promise 对象的回调链，不管以 then 方法还是 catch 方法结尾，要是最后一个方法抛出错误都有可能无法捕捉到（因为 Promise 内部错误不会冒泡到全局）。done 方法放在回调链的尾端，保证抛出任何可能出现的错误

```javascript
asyncFunc().then(f1).catch(r1).then(f2).done();
```

实现代码：

```javascript
Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected).catch(function (reason) {
        // 抛出全局错误
        setTomeout(() => {
            throw reason;
        }, 0);
    });
};
```

done 方法可以像 then 方法那样用，提供 Fulfilled 和 Rejected 状态的回调函数
，也可以不提供任何参数。但不管怎样，done 方法都会捕捉到任何可能出现的错误，并向全局抛出。

### finally()

finally 方法用于指定不管 Promise 对象最后状态如何都会执行的操作。它与 done 方法的最大区别在于，它接受一个普通的回调函数作为参数，然后使用 finally 方法关掉服务器。
下例，服务器使用 Promise 处理请求，然后使用 finally 方法关掉服务器。

```javascript
server
    .listen(0)
    .then(function () {
        // run test
    })
    .finally(server.stop);
```

finally 实现

```javascript
Promise.prototype.finally = function(callback){
	let p = this.constructor;
	return this.then(
		value  => p.resolve(callback().then(() => value))
		reason => p.resolve(callback().then(() => { throw reason }))
	);
}
```

上面的代码中，不管前面的 Promise 是 Fulfilled 还是 Rejected，都会执行回调函数 callback。
