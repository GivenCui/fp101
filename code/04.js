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

const prettyPrintJson2 = x => {
  return JSON.stringify(x, null, 2)
}

// 打印某个格式化的JSON
let prettyPrintJson = partial(JSON.stringify, undefined, null, 2)
console.log(prettyPrintJson({ name: 'fangxu', gender: 'male' }))
console.log(prettyPrintJson2({ name: 'fangxu', gender: 'male' }))
