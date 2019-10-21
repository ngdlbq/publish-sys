const Tool = require('../utils/tool.js')

const validate = (name) => {
  return ['张三', '李四', 'ngdlbq'].includes(name)
}

const sendMail = data => {
  Tool.sendMail({
    to: data.email,
    subject: '构建消息通知',
    html: `
      <p>构建结果：失败</p>
      <p>原因：您没有权限发布，请找相关人员进行发布</p>
    `
  })
}

module.exports = function() {
  return (ctx, next) => {
    const {pusher: {name, email}} = ctx.request.body
    if (!validate(name)) {
      console.log('fail publish')
      sendMail({email})
      return   
    }
    next()
  }
}