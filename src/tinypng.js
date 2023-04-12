const utils = require("./utils")
const fs = require('fs/promises')
const Base64 = require('crypto-js/enc-base64')
const Utf8 = require('crypto-js/enc-utf8')

/**
 * 读取本地图片，上传至tinypng压缩，获取压缩后url，下载图片buffer
 *
 * @param ctx PicGo
 * @param imageUrl 本地图片路径
 * @param key 配置中的api key
 * @returns {Promise<Buffer>}
 */
async function tinypngKeyCompress(ctx, imageUrl, key) {
  return await fs.readFile(imageUrl).then(fileData => {
    // 1.构造请求参数（向tinypng请求）格式参考https://tinify.cn/developers/reference
    const bearer = Base64.stringify(Utf8.parse(`api:${key}`))
    const fetchOptions = {
      method: 'POST',
      url: 'https://api.tinify.com/shrink',
      json: true,
      resolveWithFullResponse: true,
      headers: {
        Host: 'api.tinify.com',
        Authorization: `Basic ${bearer}`
      },
      data: fileData
    }

    // 2.发送压缩请求
    return ctx.request(fetchOptions).then(response => {
      // 3.获取压缩后图片的url
      if (response.status && response.status >= 200 && response.status <= 299) {
        const location = response.headers.location
        ctx.log.info('压缩后的地址：', location)
        
        // 4.从url中获取网络图片
        return utils.fetchImage(ctx, location).then(res => {
          // 5.获取压缩后的图片buffer，构造picGO需要的格式
          return utils.getImageInfo(imageUrl, res.data)
        })
      }
      throw new Error('压缩出错')
    })
  })
}

exports.tinypngKeyCompress = tinypngKeyCompress