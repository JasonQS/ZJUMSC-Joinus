# MSC-Joinus
浙大微软学生俱乐部2018的纳新网站

### 前端
bootstrap-v4 fullpage.js

设计网站时观摩各种模板, 然后决定首页放视频作为背景, 用fullpage.js做页面切换, 然后在各大视频网站上找

[videezy](https://www.videezy.com/backgrounds) 这个网站上有很多免费的视频, 而 shutterstock 里有很多超酷炫但是贵哭了的视频, 一个就要80刀, 很多免费视频网站都会挂上shutterstock里的链接并给出9折优惠(还是买不起啊)

找了很久之后选了个比较满意的 [digital-glowing-pixelated-eart](https://www.videezy.com/abstract/8092-digital-glowing-pixelated-earth) 不过它并不能 循环播放/一直播放 所以我用Pr选了个让页面看上去舒服的位置缓缓停下了

后来发现在 腾讯x5内核 UC浏览器 以及手机自带的浏览器里并不能做到像 Chrome 这样把视频作为背景, 它们会把视频单独拎出来给个窗口播放. 虽然x5的文档里写 加个配置可以把视频沉到地下, 但还是会有个框, 并且在页面切换(关闭视频)的时候有很大的延时. 所以我放弃在其他浏览器适配视频背景, 选了个差不多颜色的背景 并在右上角提示"建议使用Chrome/Safari打开"

社团的介绍部分原本打算直接参考 bootstrap 的 [卡片](https://v4.bootcss.com/docs/4.0/examples/pricing/) , 不过以 bootstrap 默认的响应式, 会在手机宽度下把各个卡片单列排放, 我觉得并不好看, 所以我把手机端和电脑端分开来写, 手机端用fullpage的滑动切换卡片, 电脑端就直接一行显示所有的

下面就是适配各种客户端的, 我需要区分出三种:
```
-- 手机
  -- Chrome/Safari等
  -- 腾讯x5等
-- 电脑
```
为了方便, 我直接在前端js获取ua, 用正则判断后请求重定向到各个页面, 不过这样我修改时就要改3份html, 感觉很不优雅

本人前端小白 有更好的方案欢迎在issue里留言

### 后端
Java spring 

后端没啥好说, 增查, 再验证下表单的合法性, 内容不为空, 长度限制, 防止xss. 也没有文件上传的操作 所以没啥要注意的

代码就不放了

### 服务器
nginx tomcat mysql

为了有趣(不让新生看到我丑陋的博客) 买了个新域名 httnb.fun (htt就是可爱的会长大人啦), 懒得备案, 于是用 Let'sEncrypt 上 https 

服务器在阿里云 他会直接在入口把请求转发, 所以我在 nginx 里面把 http 301 到 https 也是没用的, 只能直接从 https 访问

nginx 处理80端口的静态请求, 后端请求我会在网址里加一个标识 , 转发所有带 /j/ 的给 tomcat

### 最终效果
https://msc-joinus.httnb.fun
