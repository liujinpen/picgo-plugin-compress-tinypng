## picgo-plugin-picgo-plugin-compress-tinypng

# 说明
使用tinify.cn的api对上传的图片进行压缩，因此需要申请api key  
因为图片需要上传到tinify压缩后再下载，因此整体上传时间更长了  
只测试了GUI插件  
# 使用方法
1. 安装  
已发布npm，在PicGo插件设置中搜索tinypng即可，或者下载源码本地导入PicGo。
2. 配置  
加载插件后，启用`transformer-tinypng`选项  
点击`配置plugin -picgo-plugin-tinypng`：  
图床配置名：可以自定义；  
key：tinify官网申请的API key。

