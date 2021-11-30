# 富文本在线编辑-参数库

### 开始
```bash
$ yarn install
```

### 运行
```bash
$ yarn serve
```

### 打包
```bash
$ yarn build
```

### 文件目录
```markdown
-build   webpack文件配置
-assets         静态资源
-components     公共组件
---parameters 参数库组件
---container     UI容器
-config     项目配置文件
-template       默认模板
-types      类型接口文件
-utils        工具类方法
-text.js     入口主文件
```


### 数据库设计表
```
parameters:
| id | name | htmlTpl |
| :----:| :----: |:----:|
| string | string | string |
```
