const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'qq',
  secureConnection: true, // 使用 SSL
  port: 465, // SMTP 端口
  auth: {
    user: '2578326021@qq.com', // 账号
    pass: 'xvxcrpudmavydiij' // 密码
  }
})

const sendMail = data => {
  const {to, subject, html} = data
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from: '2578326021@qq.com',
      to, subject, html
    }, err => {
      if (err) {
        reject(err)
      } else {
        resolve('success')
      }
    })
  })
}


class Tool {
  constructor() {}
  async sendMail(data) {
    const {to, subject, html} = data
    try {
      const info = await sendMail({
        to, subject, html
      })
      return info
    } catch(err) {
      throw new Error(err)
    }
  }
  getPublishTime() {
    const date = new Date()
    return date.toLocaleString()
  }
}

module.exports = new Tool()