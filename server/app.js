'use strict'

const Koa = require('koa')
const onerror = require('koa-onerror')
const app = new Koa()
const { passProxy } = require('./proxy')

onerror(app, {
  accepts() {
    // 当遇到 */* 时，默认返回 json
    return this.accepts('json', 'html', 'text') // this 指向当前请求的 ctx
  },
  html(err, ctx) {
    ctx.status = err.code || err.status
    ctx.body = ctx.status === 200 ? (ctx.body || renderError(ctx, err)) : renderError(ctx, err)
  },
  json(err, ctx) {
    if (err.code === 200) {
      ctx.body = ctx.body || {success: false, errorMsg: err.message}
    } else {
      ctx.body = {success: false, errorMsg: err.message}
    }

    if (process.env.FAST_ROUTE_ENV != 'prod') {
      // 非生产环境下会带上错误的错误栈
      ctx.body.errStack = err.stack
    }
  },
})

app.use(async function(ctx) {
  passProxy(ctx)
}).listen(3000)
console.log(`Started server, listen at 3000`)

