const exec = require('child_process').exec
const path = require('path')
const ora = require('ora')
const spinner = ora()
const Tool = require('../utils/tool.js')
const dist = path.join(__dirname, '../../source_code')

const Test = require('./beforePublish.js')


const cmdList = {
  pull(origin, name) {
    return `
      cd ${dist};
      rm -rf ${name};
      git clone ${origin};
    `
  },
  build(name) {
    return `
      cd ${dist}/${name};
      npm install;
      npm run build-test;
    `
  },
  deploy(source, dist) {
    return `
      rm -rf ${dist}/*.*;
      cp ${source}/*.* ${dist}
    `
  }
}

const ENV_Map = {
  master: '生产',
  test: '测试',
  dev: '开发',
  preview: '预发'
}

class PushController {
  constructor() {
    this.origin = ''
    this.projectName = ''
    this.ctx = null
  }
  async run(origin, projectName, ctx) {
    this.origin = origin
    this.projectName = projectName
    this.ctx = ctx

    try {
      spinner.start('start pull')
      await this.pull()
      spinner.succeed('pull code complete')

      spinner.start('start build')
      await this.build()
      spinner.succeed('build complete')

      this.beforePublish()

      spinner.start('start deploy')
      await this.deploy()
      spinner.succeed('deploy success')

      await this.sendMail()
      spinner.succeed('email success')

    } catch(err) {
      throw new Error(err)
    } finally {
      spinner.stop()
    }
  }
  beforePublish() {
    // todo lint、性能测试
    const source = `${dist}/${this.projectName}/dist`
    new Test(source)
  }
  execCmd(cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd, err => {
        if (err) {
          reject(err)
        }
        resolve('success')
      })
    })
  }
  pull() {
    // pull code
    const {origin, projectName} = this
    return this.execCmd(cmdList.pull(origin, projectName))
  }
  save(target) {
    // save code
    // todo
  }
  build() {
    // run build
    const {projectName} = this
    return this.execCmd(cmdList.build(projectName))
  }
  deploy() {
    // deploy
    const source = `${dist}/${this.projectName}/dist`
    const d = '/Users/libinquan/study/工程化实践/pm-2/server/static'
    return this.execCmd(cmdList.deploy(source, d))
  }
  async sendMail() {
    const {ref, pusher: {name, email}, repository: {name: projectName}} = this.ctx.request.body
    const branch = ref.split('/').pop()
    return await Tool.sendMail({
      to: email,
      subject: '构建消息通知',
      html: `
        <p>构建结果：成功</p>
        <p>${name}/${projectName}</p>
        <p>环境： ${ENV_Map[branch]}</p>
        <p>分支： ${branch}</p>
        <p>发布人： ${name}</p>
        <p>时间： ${Tool.getPublishTime()}</p>
      `
    })
  }
}

module.exports = new PushController()