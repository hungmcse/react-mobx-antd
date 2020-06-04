const {override, fixBabelImports, addDecoratorsLegacy, addWebpackPlugin, addLessLoader, adjustStyleLoaders} = require("customize-cra");
const AntdScssThemePlugin = require('antd-scss-theme-plugin');
const path = require("path");

module.exports = override(
    addDecoratorsLegacy(),
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
    }),
    adjustStyleLoaders(rule => {
        const loaders = rule.use;
        const newUse = [];
        loaders.forEach(loaderObj => {
            if (typeof loaderObj === 'object') {
                var renamedLoader = null;
                if (loaderObj.loader.indexOf('sass-loader') !== -1) renamedLoader = 'sass-loader';
                if (loaderObj.loader.indexOf('less-loader') !== -1) renamedLoader = 'less-loader';
                if (renamedLoader) {
                    loaderObj.loader = renamedLoader;
                    newUse.push(AntdScssThemePlugin.themify(loaderObj));
                } else {
                    newUse.push(loaderObj);
                }
            } else {
                newUse.push(loaderObj);
            }
        })
        rule.use = newUse;
        return rule;
    }),
    addWebpackPlugin(new AntdScssThemePlugin(path.resolve(__dirname, "./src/theme.scss"))),
);
