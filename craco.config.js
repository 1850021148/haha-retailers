const CracoLessPlugin = require('craco-less')
const path = require('path')

const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
  webpack: {
    alias: {
      '@@': pathResolve('.'),
      '@': pathResolve('src'),
      '@assets': pathResolve('src/assets'),
      '@common': pathResolve('src/common'),
      '@components': pathResolve('src/components'),
      '@hooks': pathResolve('src/hooks'),
      '@pages': pathResolve('src/pages'),
      '@store': pathResolve('src/store'),
      '@utils': pathResolve('src/utils')
    }
  },
  // babel: {
  //   plugins: [
  //     ['import', { libraryName: 'antd', style: true }],
  //     ['@babel/plugin-proposal-decorators', { legacy: true }]
  //   ]
  // },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#FFE300',
              // '@text-color': 'rgba(0, 0, 0, 0.65)'
            },
            javascriptEnabled: true,
          },
        },
      }
    },
  ],
  devServer: {
    port: 9000,
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:8084/',
        target: 'http://onlineretailer.free.idcfengye.com',
        changeOrigin: true
      },
      '/static': {
        // target: 'http://127.0.0.1:8084/',
        target: 'http://onlineretailer.free.idcfengye.com',
        changeOrigin: true
      }
    }
  }
}