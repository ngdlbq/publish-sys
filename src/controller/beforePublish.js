// 发布前置操作，包括code lint、性能测试
const exec = require('child_process').exec
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const dist = path.join(__dirname, '../../source_code')
const source = `${dist}/gant-cicd/dist`

const formateSize = byte => (byte / 1024).toFixed(2)


function lint() {
  // todo 全组 lint 风格统一
}

function perform(source) {
  // todo 性能测试
  const dir = fs.readdirSync(source)

  dir.forEach(file => {
    const filePath = source + '/' + file
    console.log(chalk.gray(`${file}:  ${formateSize(fs.statSync(filePath).size)} kb`))
    console.log('\n')
  })
}

class Test {
  constructor(source) {
    this.source = source
    this.perform()
  }
  perform() {
    perform(this.source)
  }
  lint() {
    lint(this.source)
  }
}

module.exports = Test