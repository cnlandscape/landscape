'use strict'

const HttpProxy = require('http-proxy')
const NodeCache = require( "node-cache" )
const modifyResponse = require('node-http-proxy-json')
const cache = new NodeCache()
const proxy = new HttpProxy()
const WAIT_TIME = 60 * 1000     // 1min
const CACHE_TIME = 60 * 60 * 24 * 7 // 1day
const API_TOKEN = process.env.API_TOKEN

proxy.on('error', (err, req, res) => {
  console.log(err)
  res.end()
})

proxy.on('proxyRes', function (proxyRes, req, res) {
  const cacheKey = proxyRes.req.path
  modifyResponse(res, proxyRes, function (body) {
    console.log('res: ', body)
    if (body) {
      cache.set(cacheKey, JSON.stringify(body), CACHE_TIME)
    }
    return body; // return value can be a promise
  });
})

/**
 * run proxy
 * @param {*} ctx
 * @return {object} proxy app
 * @public
 */
exports.passProxy = function(ctx) {
  // 没有route的时候默认使用upstream模式
  ctx.respond = false // 禁止koa断开连接

  console.log(`Proxy for ${ctx.path}`)
  const cachedata = cache.get(ctx.path)
  if (cachedata) {
    ctx.status = 200
    ctx.res.end(cachedata)
    return
  }

  // 开始代理
  return proxy.web(ctx.req, ctx.res, {
    target: `https://api.github.com${ctx.path}`,
    ignorePath: true,
    secure: false,
    timeout: WAIT_TIME,
    headers: {
      Authorization: API_TOKEN
    },
    changeOrigin: true,
  }, function (e) {
    console.log(e)
})
}

