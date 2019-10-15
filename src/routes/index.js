const Router = require('koa-router')
const router = new Router()
router.post('/', ctx => {})

router.get('/', ctx => {
  ctx.response.body = 'this is lbq'
})

module.exports = router