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
