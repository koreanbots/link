const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const Router = require('koa-router')
require('dotenv').config()

const app = new Koa()
const router = new Router()

const knex = require('./db')

app.use(BodyParser())

router.all('/', (ctx) => {
  ctx.redirect('https://koreanbots.dev')
})

router.post('/regist', async (ctx) => {
  const { id, redirect, category } = ctx.request.body
  const password = ctx.request.header.authorization

  if(!id || !redirect || !category) return ctx.body = { success: false, error: 'Please insert id, url, and category' }
  if(password !== process.env.SECRET_KEY) return ctx.body = { success: false, error: 'Invalid password' }

  await knex('link').insert({
    id,
    redirect,
    category
  }).then(() => {
    ctx.body = {
      success: true
    }
    console.log('success')
  }).catch((err) => {
    console.log(err)
    return ctx.body = {
      success: false,
      error: 'Internal Server Error'
    }
  })
})

router.all('/:id', async (ctx) => {
  console.log(ctx.params.id)
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

router.all('/b/:id', async (ctx) => {
  const link = await knex('link').where({ id: ctx.params.id, category: 'b' })
  if(link.length === 0) {
    ctx.status = 404
    ctx.body = 'Not Found'
    return
  }
   else {
    ctx.redirect(link[0].redirect)
  }
})

router.all('/u/:id', async (ctx) => {
  const link = await knex('link').where({ id: ctx.params.id, category: 'u' })
  if(link.length === 0) {
    ctx.status = 404
    ctx.body = 'Not Found'
    return
  }
   else {
    ctx.redirect(link[0].redirect)
  }
})

router.all('/s/:id', async (ctx) => {
  const link = await knex('link').where({ id: ctx.params.id, category: 's' })
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