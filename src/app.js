const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./routes/index.js')
const app = new Koa()

app.use(bodyParser())
app.use(router.routes())

app.listen(8001, err => {
  if (err) throw new Error(err)
  console.log(`listening 8001`)
})


// ./ngrok authtoken 1SFDWZJ9uim4eKmIxLATRAThCVh_BsQqN7yqYuPPxqSLdo7b
