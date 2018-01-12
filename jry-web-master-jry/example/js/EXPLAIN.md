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
				|_ app : 入口（路由监听、路由定义、启动）
				|			
				|_ services:服务
				|      |
				|      |_ filters
				|      |    |
				|      | 	|_ eorrFilters : 前后台错误码MAP、报错文案集合
				|      |    |
				|      | 	|_ mapsFilters : 公共方法、过滤条件
				|      |    |
				|      | 	|_ portFilters : 业务过滤条件
				|      |
				|      |_ resourceService ： 公共后台异步请求
				|
				|_ ng : 组件、指令
				|      |
				|      |_ dialog : 弹框切片集合
				|
				|_ controllers : 业务
				|      |
				|      |_activityCtrls : 活动页业务
				|      |
				|      |_ 业务逻辑页中有对应页面注释

