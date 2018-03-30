import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  //拼接url参数
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, redirect) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        redirect(err)
      }
    })
  })
}

//获取url的参数
function param(data) {
  let url = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`//es6语法，模板字符串变量注入
  }
  return url ? url.substring(1) : ''
}
