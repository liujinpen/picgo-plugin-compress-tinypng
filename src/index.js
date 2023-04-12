const tinypng = require("./tinypng")

module.exports = (ctx) => {
  const handle = ctx => {
    // 获取配置的key
    const config = ctx.getConfig('tinypng') || ctx.getConfig('picgo-plugin-tinypng')
    const key = config['key']

    // input是一个路径列表，对每个路径的图片都先进行压缩
    const tasks = ctx.input.map(imageUrl => {
      ctx.log.info('图片地址:' + imageUrl)
      // 调用压缩方法
      return tinypng.tinypngKeyCompress(ctx, imageUrl, key).then(res => {
        return res
      })
    })

    return Promise.all(tasks).then((output) => {
      ctx.output = output
      return ctx
    })
  }

  const config = ctx => {
    let config = ctx.getConfig('tinypng') || ctx.getConfig('picgo-plugin-tinypng')
    if (!config) {
      config = {}
    }
    ctx.log.info('读取config：', config)
    return [{
      name: 'key', // 配置名
      type: 'input', // 配置类型，input 展示为一个输入框
      default: config.key || null, // 默认值
      required: true, // 是否必填
      message: '填写tinypng的API Key' // 占位符
    }]
  }

  const register = () => {
    ctx.helper.transformer.register('tinypng', {handle})
  }
  return {
    transformer: 'tinypng',
    register,
    config
  }
}
