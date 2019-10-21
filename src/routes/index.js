const Router = require('koa-router')
const pushController = require('../controller/pushController.js')
const router = new Router()

router.post('/api/push', ctx => {
  const signature = ctx.header['x-hub-signature']
  // console.log('signature', signature)

  // console.log(ctx.request)
  // console.log('\n')
  // console.log('\n')
  // console.log('\n')
  // console.log(ctx.request.body)
  // console.log(ctx.get('date'))


  const {repository: {clone_url, ssh_url, name}} = ctx.request.body
  pushController.run(clone_url, name, ctx)
})

router.get('/', ctx => {
  console.log(111)
  ctx.response.body = 'this is lbq'
})

module.exports = router