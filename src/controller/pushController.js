const exec = require('child_process').exec
const path = require('path')
const ora = require('ora')
const spinner = ora()

const dist = path.join(__dirname, '../../source_code')

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

class PushController {
  constructor() {
    this.origin = ''
    this.projectName = ''
  }
  async run(origin, projectName) {
    this.origin = origin
    this.projectName = projectName

    try {
      spinner.start('start pull')
      await this.pull()
      spinner.succeed('pull code complete')

      console.log('\n')
      spinner.start('start build')
      await this.build()
      spinner.succeed('build complete')

      console.log('\n')
      spinner.start('start deploy')
      await this.deploy()
      spinner.succeed('deploy success')

    } catch(err) {
      throw new Error(err)
    } finally {
      spinner.stop()
    }
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
  }
  build() {
    // run build
    const {projectName} = this
    return this.execCmd(cmdList.build(projectName))
  }
  deploy() {
    // deploy
    const source = `${dist}/${this.projectName}/dist`
    const d = '/Users/libinquan/study/工程化实践/server/static'
    return this.execCmd(cmdList.deploy(source, d))
  }
}

module.exports = new PushController()