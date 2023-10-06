const path = require('path')
// const { webpack } = require('webpack')
const webpack = require('webpack');
const childProcess = require('child_process');
require('dotenv').config()
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');


// 모듈을 밖으로 빼내는 노드 JS 문법입니다. 엔트리, 아웃풋, 번들링 코드를 설정할 수 있습니다.
module.exports ={
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: {
    main : path.resolve('./src/app.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist')
  },
  module: {
    // loader를 추가하는 장소입니다.
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     path.resolve('./myLoader.js')
      //   ]
      // }
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
          
        ]
      },
      {
        // 여기 추가합니다.
            test: /\.(png|jpg|gif|svg)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
              maxSize: 20 * 1024 // 1kb가 1024byte 이기 때문에 20kb를 원한다면 1024에 20을 곱합니다.
              }
        },
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
      Commit version : ${childProcess.execSync('git rev-parse --short HEAD')}
      Committer : ${childProcess.execSync('git config user.name')}
      마지막 빌드 시간 : ${new Date().toLocaleString()}
  `
    }),
    new webpack.DefinePlugin({
      // pw: 12345
      dev: JSON.stringify(process.env.DEV_API),
      pro: JSON.stringify(process.env.PRO_API)
    }),
    new HtmlWebpackPlugin({
      template: './index.html', // 목표 html 파일의 위치입니다.
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    // 이미지 압축 작업을 실행할지 결정합니다.
    minimize: true,
    minimizer: [
        new ImageMinimizerPlugin({
            test: /\.(jpe?g|png|gif|svg)/i,
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        ["imagemin-optipng", { optimizationLevel: 0 }]
                    ]
                }
            }
        })
    ]
}
}
