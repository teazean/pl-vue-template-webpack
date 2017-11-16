# 说明

这个repo是<https://github.com/teazean/vue-template-webpack>的一个fork，因为原来就是forked，没办法，只能新建一个


## 主要相对于`teazean/vue-template-webpack`主要做了一下变动

**vue-templates/webpack**的所有静态资源打包的路径都是相对于`/static'的，不符合`lego-events`的分子目录的发布。因此把打包的路径全部都改成相对于`./`相对路径。
1. 去除所有`static`打包前缀，打包的目录如下

    ```
    // 为什么要js、css都要在第一级。。因为所有css中引用的相对路径的资源都是相对当前css的路径，如果css不在第一级，就会出错。。（蛋疼）
    - dist
        - index.html
        - *.js
        - *.css
        - imgs
            - *.png
            - *.jpg
    ```
2. 项目目录`static`目录，继续copy到`dist/static`下。

## 模板说明文档
见：<https://github.com/vuejs-templates/webpack>
