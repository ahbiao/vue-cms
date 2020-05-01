//webpack 底层使用node.js开发的
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 引用删除文件的插件
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin')

const webpack = require('webpack')
// 引用压缩js的插件
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
// 引用抽离css的插件
const miniCssExtractPlugin = require('mini-css-extract-plugin')
// 导入压缩css的插件
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
	//mode用来指定编译模式
	mode: 'production', // development(开发模式未压缩) production(发布模式已压缩)

	//webpack中默认入口文件 ./src/index.js
	//         默认输出文件 ./dist/main.js
	entry: path.join(__dirname, './src/index.js'), //项目入口文件地址
	output: {
		path: path.join(__dirname, './dist'), //输出文件路径
		filename: 'js/index.js' //输出文件名称
	},
	plugins: [ //插件数组
		new htmlWebpackPlugin({ //把html首页托管到内存中去
			template: path.join(__dirname, './src/index.html'), //要把哪个html文件做为模板,复制一份,在内存中托管
			filename: 'index.html', //在内存中的文件名称
			title: '首页', //生成html的标题
			minify: { //压缩html
				collapseWhitespace: true, //合并空白字符
				removeComments: true, //删除注释
				removeAttributeQuotes: false //删除标签上属性的引号
			}
		}),
		new CleanWebpackPlugin(), //默认每次删除output中的目录
		new webpack.DefinePlugin({ // 此插件作用，为第三方包，添加全局变量
			// 此变量就是第三方默认，如果是production值就会自动内部优化，移除警告等
			'process.env.NODE_ENV': '"production"'
		}),
		new miniCssExtractPlugin({ //抽取css为单独文件
			filename: 'css/style.css'
		}),
		new optimizeCssAssetsWebpackPlugin(), //压缩css文件
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
				use: [{
					loader: miniCssExtractPlugin.loader,
					options: {
						publicPath: '../' //表示如果css样式中包含路径，则自动在路径前加 ../ 前缀
					}
				}, 'css-loader', 'postcss-loader'] // postcss-loader是为css属性自动添加兼容前缀  先style-loader,后css-loader.  顺序不能错 (调用规则是从后往前)
			}, { //配置.less文件规则
				test: /\.less$/,
				use: [{
					loader: miniCssExtractPlugin.loader,
					options: {
						publicPath: '../'
					}
				}, 'css-loader', 'less-loader']
			}, { //配置.scss文件规则
				test: /\.scss$/,
				use: [{
					loader: miniCssExtractPlugin.loader,
					options: {
						publicPath: '../'
					}
				}, 'css-loader', 'sass-loader']
			}, { //配置图片、字体文件规则
				test: /\.jpg|png|bmp|gif$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 43713,
						name: '[hash:6]-[name].[ext]',
						outputPath: 'images/'
					}
				}
				//'url-loader?limit=43713&name=images/[hash:6]-[name].[ext]'
				// 需要 url-loader和file-loader（file-loader是url-loader的内置依赖项）
				// ? 问号之后是传递的参数
				// limit表示图片大于limit的不会被转成base64（单位为：字节 byte）
				// name表示指定文件名称  hash:6表示取hash前6位    name表示原来名称   ext表示原来扩展名
				// name之后可以直接加目录名，表示要发布图片到什么目录下
			}, {
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
				// exclude表示排除项，表示不需要处理node_modules中的js文件
			},{
				test:/\.vue$/,
				use:'vue-loader'
			}
		]
	},
	optimization: { //优化
		splitChunks: { //分割包
			chunks: 'all',
			// 默认值，可以不写~  一般不用修改
			minSize: 30 * 1024, //表示要分割的chunk最小为30kb
			maxSize: 0, // 表示最大没有限制
			minChunks: 1, //表示要提取的chunk最少引用一次
			maxAsyncRequests: 5, //按需加载时并行加载的文件的最大数量
			maxInitialRequests: 3, //入口js文件最大并行请求数量
			automaticNameDelimiter: '~', //连接符
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10, //优先级
					filename: 'js/vendors.js'
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true //如果当前要打包的文件和之前的一样，就会复用之前的
				}
			}
		},
		minimizer: [ //最小化包
			new uglifyjsWebpackPlugin({
				test: /.js($|\?)/i,
				uglifyOptions: {
					warnings: false //移除警告信息
				}
			})
		]
	}
}