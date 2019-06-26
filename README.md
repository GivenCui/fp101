# 函数式编程学习<!-- omit in toc -->

## 目录<!-- omit in toc -->
- [相关](#%E7%9B%B8%E5%85%B3)
- [概念](#%E6%A6%82%E5%BF%B5)
  - [声明式](#%E5%A3%B0%E6%98%8E%E5%BC%8F)
  - [纯函数](#%E7%BA%AF%E5%87%BD%E6%95%B0)
  - [高阶函数](#%E9%AB%98%E9%98%B6%E5%87%BD%E6%95%B0)
  - [Currying](#Currying)
  - [偏应用](#%E5%81%8F%E5%BA%94%E7%94%A8)

---

## 相关
- [JavaScript函数式编程入门经典](https://cfangxu-2.gitbook.io/front-end-basics/javascript/li-lun-pian/fp)

## 概念
> Functional programming, 函数式编程, 是一种编程范式, 函数是纯函数.

### 声明式
> 函数式编程主张以抽象的方式创建函数，例如上文的forEach，这些函数能够在代码的其他部分被重用
[demo01](code/01.js)
```js
// 有一个数组，要遍历它并把它打印到控制台

const arr = [1, 2, 3]

// 命令式
// 怎么干?
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

// 声明式
// 想干什么?
arr.forEach(el => console.log(el))

```
### 纯函数
> 纯函数是对给定的输入返回相同的输出的函数，并且纯函数不应依赖任何外部变量，也不应改变任何外部变量。

- 没有副作用
- 可以缓存

### 高阶函数
> 高阶函数是接受函数作为参数并且/或者返回函数作为输出的函数

`(fn) => fn`
特点: 调用后还需要调用, e.g. `hFun(f)(g)()`

[demo02](code/02.js)

```js

const add = (x, y) => {
  return x + y
}

const multipy = (x, y) => {
  return x * y
}

/**
 * @description optionCurried是高阶函数, 更加抽象, 复用性更好
 * @param {Function} option
 * @return {Function}
 */
const optionCurried = option => x => y => option(x, y)

const addC = optionCurried(add)
const add4 = addC(4)
console.log(addC(1)(2)) // 1 + 2 = 3
console.log(add4(2)) // 4 + 2 = 6

const multipyC = optionCurried(multipy)
const multipy4 = multipyC(4)
console.log(multipyC(1)(2)) // 1 * 2 = 2
console.log(multipy4(2)) // 4 * 2 = 8

```
### Currying
> 把多参数函数变成接收一个参数, 并返回新函数 (也是一元函数)的方法, 通过高阶函数实现

[demo03](code/03.js)

```js
// 多元函数的currying

const curry = fn => {
  if (typeof fn !== 'function') {
    throw Error('No function provided')
  }
  return function curriedFn(...args) {
    // 判断当前接受的参数是不是小于进行柯里化的函数的参数个数
    // fn.length 是函数的定义的参数个数
    if (args.length < fn.length) {
      // 如果小于的话就返回一个函数再去接收剩下的参数
      return function(...argsOther) {
        // 尾递归调用
        return curriedFn.apply(null, args.concat(argsOther))
      }
    } else {
      return fn.apply(null, args)
    }
  }
}

// curry的应用
const multiply = (x, y, z) => x * y * z
console.log(curry(multiply)(2)(3)(4))

// 思考: 为啥要这么做呢?

```
### 偏应用
> 部分的传入参数, 用`undefined`作为占位符

[demo04](code/04.js)

```js

const partial = function(fn, ...partialArgs) {
  return function(...fullArguments) {
    let args = partialArgs
    let arg = 0
    for (let i = 0; i < args.length && arg < fullArguments.length; i++) {
      // undefined相当于占位符
      if (args[i] === undefined) {
        args[i] = fullArguments[arg++]
      }
    }
    console.log(args)
    return fn.apply(null, args)
  }
}

// 传统方式调用
const prettyPrintJson2 = x => {
  return JSON.stringify(x, null, 2)
}

// partial更抽象
// 后续出入的参数会替换undefined的部分  (从左向右的替换)
let prettyPrintJson = partial(JSON.stringify, undefined, null, 2)

console.log(prettyPrintJson({ name: 'fangxu', gender: 'male' }))
console.log(prettyPrintJson2({ name: 'fangxu', gender: 'male' }))

```
