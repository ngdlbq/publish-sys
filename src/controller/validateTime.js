// 发布时间校验

const Tool = require('../utils/tool.js')
const validate = () => {
  // const h = new Date().getHours()
  // return h >= 14 && h <= 16
  return true
}

const sendMail = data => {
  Tool.sendMail({
    to: data.email,
    subject: '构建消息通知',
    html: `
      <p>构建结果：失败</p>
      <p>原因：时间校验不对</p>
    `
  })
}

module.exports = function() {
  return (ctx, next) => {
    if (!validate()) {
      console.log('fail publish')
      // const {pusher: {name, email}, repository: {name: projectName, default_branch: branch}} = ctx.request.body
      const {pusher: {email}} = ctx.request.body      
      sendMail({email})
      return
    }
    next()
  }
}