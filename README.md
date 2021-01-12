
<h1 align="center">BBBUG聊天室 微信小程序</h1>
<p align="center">
<a href="https://github.com/HammCn/BBBUG-Wechat-App" target="_blank">Github</a> | 
<a href="https://gitee.com/bbbug_com/bbbug-wechat-app" target="_blank">Gitee</a>
</p>
<p align="center">
<a href="https://gitee.com/bbbug_com/bbbug-wechat-app/stargazers" target="_blank"><img src="https://svg.hamm.cn/gitee.svg?type=star&user=bbbug_com&project=bbbug-wechat-app"/></a>
<a href="https://gitee.com/bbbug_com/bbbug-wechat-app/members" target="_blank"><img src="https://svg.hamm.cn/gitee.svg?type=fork&user=bbbug_com&project=bbbug-wechat-app"/></a>
<img src="https://svg.hamm.cn/badge.svg?key=Platform&value=微信小程序"/>
</p>
<p align="center">
<img width="200" src="https://images.gitee.com/uploads/images/2020/1115/155720_ed5789d0_145025.jpeg"/>
</p>

### 介绍

一个可以聊天听歌的音乐聊天室，支持了Gitee/OSChina/QQ/钉钉等OAuth登录，支持多房间和创建私人房间，支持房间加密和切换房间模式，支持绑定二级域名与顶级域名，提供了第三方网站的快速接入方案。此仓库为微信小程序仓库。开发者QQ群：1140258698

体验一下：<a href="https://www.bbbug.com/" target="_blank">www.bbbug.com</a>

### 免责声明

平台音乐和视频直播流数据来源于第三方网站，仅供学习交流使用，请勿用于商业用途。

### 技术架构

IM后端采用```node-websocket```实现```Websocket```服务，使用```pm2```持久化运行，```Nginx```做Wss代理，前端采用```ElementUI&vue```实现，后端使用```PHP```做数据接口API，```PHP-CLI```做后端数据同步，```Redis```做数据队列与缓存。 


### 使用说明

1. clone当前项目 ```git clone https://gitee.com/bbbug_com/bbbug-wechat-app.git```

2. 导入到微信小程序中运行即可体验

[更详细的部署手册请查看这里>>>](https://doc.bbbug.com/3097561.html)


### 已实现功能
```
1、普通文字与图片表情消息聊天功能
2、歌曲搜索、点歌、切歌、顶歌、收藏歌曲等功能
3、歌曲实时同步播放给房间所有人、支持房主电台模式
4、可创建房间、房主可禁言或禁止房间用户点歌
5、修改个人资料与设置等

更多功能等你来扩展开发...
```


### 参与贡献
```
1. Fork 本仓库
2. 新建分支 添加或修改功能
3. 提交代码
4. 新建 Pull Request
```

### 晒个截图

<p align="center">
<img src="https://images.gitee.com/uploads/images/2020/1115/160421_d7b821d3_145025.jpeg" width="20%"/>
<img src="https://images.gitee.com/uploads/images/2020/1115/160432_e9b5f02a_145025.jpeg" width="20%"/>
<img src="https://images.gitee.com/uploads/images/2020/1115/160441_01037a5f_145025.jpeg" width="20%"/>
<img src="https://images.gitee.com/uploads/images/2020/1115/160451_5b7483eb_145025.jpeg" width="20%"/>
</p>