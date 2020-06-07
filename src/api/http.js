import axios from 'axios'

// 环境切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:3000'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://liusha.ltd/music-api'
}

// 封装get请求
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
