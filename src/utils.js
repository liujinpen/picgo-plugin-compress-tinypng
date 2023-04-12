const path = require("path")
const imageSize = require("image-size")

/**
 * 获取图片信息
 * @param imageUrl
 * @param buffer
 * @returns {{fileName: string, width: number, buffer, extname: string, height: number}}
 */
function getImageInfo(imageUrl, buffer) {
  const {width, height} = imageSize.imageSize(buffer)
  return {
    buffer,
    width: width, //宽度
    height: height, //高度
    fileName: path.basename(imageUrl), // 文件名
    extname: path.extname(imageUrl), //扩展名
  }
}

/**
 * 根据url获取文件信息
 * @param imageUrl
 * @returns {{fileName: string, extname: string}}
 */
function getUrlInfo(imageUrl) {
  return {
    fileName: path.basename(imageUrl),
    extname: path.extname(imageUrl)
  }
}

/**
 * 下载网络图片
 * @param ctx
 * @param url
 * @returns {*}
 */
function fetchImage(ctx, url) {
  return ctx.request({
    method: 'GET',
    url,
    encoding: null,
    resolveWithFullResponse: true,
    responseType: 'arraybuffer'
  })
}

exports.getImageInfo = getImageInfo
exports.getUrlInfo = getUrlInfo
exports.fetchImage = fetchImage
