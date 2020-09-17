module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '台灣空氣品質指標(AQI)'
        return args
      })
  }
}