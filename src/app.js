const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./routes/index.js')

const validateTime = require('./controller/validateTime.js')
const validatePermission = require('./controller/validatePermission.js')
const validateBranch = require('./controller/validateBranch.js')

const app = new Koa()

app.use(bodyParser())

// 检查分支有效性
app.use(validateBranch())

// 发布时间校验
app.use(validateTime())

// 发布权限校验
app.use(validatePermission())

app.use(router.routes())

app.listen(8003, err => {
  if (err) throw new Error(err)
  console.log(`listening 8003`)
})


// ./ngrok authtoken 1SFDWZJ9uim4eKmIxLATRAThCVh_BsQqN7yqYuPPxqSLdo7b
