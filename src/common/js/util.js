function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  //避免修改原列表
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(fnc, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      /*是apply而不是call的原因
       apply()方法
       function.apply(thisObj[, argArray])
       call()方法
       function.call(thisObj[, arg1[, arg2[, [,...argN]]]]); */
      fnc.apply(this, args)
    }, delay)
  }
}
