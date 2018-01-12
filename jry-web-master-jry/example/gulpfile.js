//引入gulp和gulp插件
var gulp = require('gulp'),  //引入gulp
    runSequence = require('run-sequence'),  //gulp执行配置 -开发构建 
    rev = require('gulp-rev'),    //gulp文件加后缀
    revCollector = require('gulp-rev-collector'),//Html更换css、js、img对应文件版本
    less=require('gulp-less'),//less编译工具
    sourcemaps = require('gulp-sourcemaps');//生成sourcemaps的css地图
    
//- 多个文件合并为一个；
var concat = require('gulp-concat'); 
//自动刷新浏览器
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

//定义css、js、img文件路径，是本地css,js,img文件的路径，可自行配置
var cssUrl = 'css/*.css',//默认css文件路径
    lessUrl='css/*.less',//默认less文件路径
    jsUrl = 'js/*.js',  //默认js文件路径 
    imageUrl = 'images/*';//默认图片文件地址路径

//编译less为css文件 并生成sourcemaps 以及自动刷新浏览器**2018/1/2 by ts**
gulp.task('concatCss',function(){
	return gulp.src('css/screen.less')
	.pipe(sourcemaps.init())//sourcemaps初始化
    //.pipe(less({compress: true})) //compress:true是否启用压缩  
    .pipe(less()) //编译less为css
	.pipe(sourcemaps.write("./"))//sourcemaps生成文件的位置，此处为和css输出地址一致
	.pipe(gulp.dest('styles'))//css输出地址
	.pipe(reload({stream: true}));//自动刷新浏览器
})

//拼接所有css为一个新的css
//gulp.task('concatCss',function(){
//	return gulp.src(lessUrl)
//	.pipe(sourcemaps.init())
//  //.pipe(less({compress: true})) //compress:true是否启用压缩  
//  .pipe(less()) //编译less为css
//	.pipe(concat('screen.css'))
//	.pipe(sourcemaps.write("./"))
//	.pipe(gulp.dest('css'))
//})

//监控less文件并只编译screen.less为css
//gulp.task('concatCss',function(){
//	return gulp.src('css/test11.less')
//  .pipe(less())    
//	.pipe(gulp.dest('styles'))
//})

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){    
    return gulp.src(cssUrl)        
        .pipe(rev())    
        .pipe(gulp.dest('rev/css'))
        .pipe(rev.manifest())        
        .pipe(gulp.dest('rev/css/revmainfest'));
});

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){    
    return gulp.src(jsUrl)        
        .pipe(rev()) 
        .pipe(gulp.dest('rev/js'))
        .pipe(rev.manifest())        
        .pipe(gulp.dest('rev/js/revmainfest'));
});

//img生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revImg', function(){    
    return gulp.src(imageUrl)        
        .pipe(rev())     
        .pipe(gulp.dest('rev/images'))
        .pipe(rev.manifest())        
        .pipe(gulp.dest('rev/images/revmainfest'));
});

//Html更换css、js、img文件版本
gulp.task('revHtml', function () {   
    return gulp.src(['rev/**/*.json', './*.html'])  /*./是本地html文件的路径，可自行配置*/       
        .pipe(revCollector())        
        .pipe(gulp.dest('.'));  /*Html更换css、js文件版本,.也是和本地html文件的路径一致*/});

//开发构建
gulp.task('dev', function (done) {   
    condition = false;   
    runSequence(        
       ['revCss'],        
       ['revJs'],        
       ['revImg'],       
       ['revHtml'],        
       done);
});

gulp.task('default', ['dev']);//默认gulp执行命令以及任务

//监测文件变化 并立即执行
//gulp.task("watch", function(){
//  gulp.watch(cssUrl, ['concatCss']);
//});

//监测文件变化 并立即执行,且直接刷新浏览器
gulp.task("watch", function(){
	browserSync.init({
//       server: "./" //默认启动地址localhost:3000
         proxy: "localhost:80"
    });
    //gulp.watch(cssUrl, ['concatCss']);//执行concatCss任务
    gulp.watch("html/**/*.html").on('change', reload);//监控html变化并刷新浏览器
    gulp.watch("js/**/*.js").on('change', reload);//监控js变化并刷新浏览器
    gulp.watch("images/**/*.png").on('change', reload);//监控图片变化并刷新浏览器
});