const Router = require('koa-router')
const pushController = require('../controller/pushController.js')
const router = new Router()

router.post('/', ctx => {
  // console.log(ctx)
  // console.log('\n\n')
  // console.log(ctx.request.body)

  const signature = ctx.header['x-hub-signature']
  // console.log('signature', signature)

  const {repository: {clone_url, ssh_url, name}} = ctx.request.body
  pushController.run(clone_url, name)
})

router.get('/', ctx => {
  ctx.response.body = 'this is lbq'
})

module.exports = router