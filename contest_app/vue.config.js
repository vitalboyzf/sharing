module.exports = {
    publicPath: "./", // 根路径
    productionSourceMap: false, // 生产环境打包不生成map文件
    outputDir: "dist", // 打包的时候生成的一个文件名
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].title = "星空动态";
            return args;
        });
    }
};