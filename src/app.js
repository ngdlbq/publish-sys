const Koa = require('koa')
const router = require('./routes/index.js')
const app = new Koa()

app.use(router.routes())

app.listen(3001, err => {
  if (err) throw new Error(err)
  console.log(`listening 3001`)
})


// ./ngrok authtoken 1SFDWZJ9uim4eKmIxLATRAThCVh_BsQqN7yqYuPPxqSLdo7b
