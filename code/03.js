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
