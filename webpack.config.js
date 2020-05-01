//webpack 底层使用node.js开发的
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	//mode用来指定个编译模式
	mode: 'development', // development(开发模式未压缩) production(发布模式已压缩)

	//webpack中默认入口文件 ./src/index.js
	//         默认输出文件 ./dist/main.js
	entry: path.join(__dirname, './src/index.js'), //打包入口文件地址
	output: {
		path: path.join(__dirname, './dist'), //输出文件路径
		filename: 'bundle.js' //输出文件名称
	},
	plugins: [ //插件数组
		new htmlWebpackPlugin({ //把html首页托管到内存中去
			template: path.join(__dirname, './src/index.html'), //要把哪个html文件做为模板,复制一份,在内存中托管
			filename: 'index.html' //在内存中的文件名称
		}),
		new VueLoaderPlugin()
	],
	// devServer:{//webpack-dev-server运行时的指令
	//     //--open chrome --port 3364 --host 127.0.0.1 --hot
	//     open:'chrome',//指定打开的浏览器  如果填写true则打开默认浏览器
	//     port:'3000',//指定打开的端口号
	//     host:'127.0.0.1',//指定地址
	//     hot:true//指定热更新 需要与webpack插件结合使用
	// }
	module: { //用来配置非 .js 文件的 loader
		rules: [ //非.js文件和loader做对应关系
			//test表示匹配  (匹配以.css结尾的文件)      use表示使用的loader
			{ //配置.css文件规则
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'] // postcss-loader是为css属性自动添加兼容前缀  先style-loader,后css-loader.  顺序不能错 (调用规则是从后往前)
			}, { //配置.less文件规则
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			}, { //配置.scss文件规则
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}, { //配置图片、字体文件规则
				test: /\.(jpg|png|bmp|gif|ttf|eot|svg|woff|woff2)$/,
				use: 'url-loader?limit=0&name=[hash:6]-[name].[ext]'
				// 需要 url-loader和file-loader（file-loader是url-loader的内置依赖项）
				// ? 问号之后是传递的参数
				// limit表示图片大于limit的不会被转成base64（单位为：字节 byte）
				// name表示指定文件名称  hash:6表示取hash前6位    name表示原来名称   ext表示原来扩展名
			}, {
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
				// exclude表示排除项，表示不需要处理node_modules中的js文件
			}, {
				test: /\.vue$/,
				use:'vue-loader'
			}
		]
	}
}