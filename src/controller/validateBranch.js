const validBranch = ['test', 'dev', 'preview', 'master']

module.exports = function() {
  return (ctx, next) => {
    const {ref} = ctx.request.body
    const branch = ref.split('/').pop()
    if (!validBranch.includes(branch)) {
      console.log('无效的分支')
      return
    }
    next()
  }
}