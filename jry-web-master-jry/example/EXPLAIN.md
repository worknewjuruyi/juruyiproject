## 项目说明

1) 样式环境使用Ruby环境下统一编译sass文件的方式
2) 直接生产环境开发：
		反向代理使用NGXIN
		ngxin设置：
			打开 nginx/conf/nginx.conf 文件
			1—— code 60 - 64
				upstream pc{
			        server 服务器地址;
			    }
			2—— code 77 - 78
				 set $htdocs 前端项目路径;
        		 listen 端口号;



## 文件部署功能注解
		文件：example
				|
				|_ css : 样式
				|			
				|_ fonts:文字图标
				|
				|_ html : 页面切片
				|
				|_ images : 静态图片资源
				|
				|_ js : 代码
				|
				|_ static : baidu分享插件
				|
				|_ vendor : 插件组件依赖


## sass 环境配置说明 ：https://www.sass.hk/install/


1.安装Ruby ： https://rubyinstaller.org/downloads/

2.Ruby环境下安装 sass compass ：	gem install sass
									gem install compass

3.到css目录下自动监听编译sass文件 执行 compass watch 