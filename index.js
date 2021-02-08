const Koa = require('koa')
const Router = require('koa-router')
require('dotenv').config()

const app = new Koa()
const router = new Router()

const knex = require('./db')

router.all('/', (ctx) => {
  ctx.redirect('https://koreanbots.dev')
})

router.all('/[id]', async (ctx) => {
  const link = await knex('link').where({ id: ctx.params.id })
  if(link.length === 0) {
    ctx.status = 404
    ctx.body = 'Not Found'
    return
  }
  else {
    ctx.redirect(link[0].redirect)
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(process.env.PORT || 4000, () => {
  console.log('server ready')
})