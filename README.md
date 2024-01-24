# Confluence 转 Markdown

转换 [Confluence 的 HTML 导出文件](#conflhowto) to Markdown文件


## 安装

你必须先安装 [pandoc] 命令行工具. 确保他运行:

```
pandoc --version
```

安装npm依赖:

```
npm install simple-confluence-to-markdown -g
```

## 使用

在转换器的目录中：

```
simple-confluence-to-markdown -i <pathResource> -o <pathResult>
```

### 参数

参数 | 描述
--- | ---
`<pathResource>` | 要转换的文件或目录，其中包含提取的 Confluence 导出内容
`<pathResult>` | 输出结果将生成到的目录。默认为当前工作目录

## 程序描述 <a name="process-description"></a>

- Confluence页面ID在HTML文件名和链接中被替换为该页面的标题
- 创建总体索引index.md，链接到所有Confluence空间-它们的索引
- 图像和其他插入的附件链接到生成的markdown文件
  - 整个`images`和`attachments`目录都被复制到结果目录中
  - 没有检查特定文件/图像是否被使用
- 生成的markdown链接到内部页面时，不包含尾部的**.md**扩展名，以符合[gitit]的要求
  - 可以通过在`.js`文件中找到所有出现`gitit requires link to pages without .md extension`的地方，并在那里添加扩展名来更改此行为。
- pandoc实用程序可以接受许多选项来改变其默认行为
  - 可以通过将它们添加到[`App.js`](src/App.js)文件中的`outputTypesAdd`，`outputTypesRemove`，`extraOptions`属性来传递给它们
  - 这里是pandoc可以接受的[选项列表][pandoc-options]
- 整个应用程序使用一个控制台日志记录器，默认的详细程度设置为INFO
  - 可以在[`Logger.js`](src/App.js)文件中将详细程度更改为DEBUG、INFO、WARNING、ERROR级别
- 对Confluence页面的HTML文本应用一系列格式化规则，以便正确转换
  - 可以在[`Page.js`](src/Page.js)文件中查看和/或更改这些规则
  - 这些规则本身位于[`Formatter.js`](src/Formatter.js)文件中

### 改进空间

如果您发现有任何不满意的地方，欢迎您提交 PR（Pull Request）。上面的 [程序描述](#process-description) 部分提到了一些很好的起点。

### 导出为 HTML

请注意，如果转换器不知道如何处理某种样式，HTML 转 Markdown 通常会保留 HTML 不变（Markdown 允许使用 HTML 标签）。

## Confluence 数据导出的逐步指南 <a name="conflhowto"></a>

1. 进入空间，选择左下方底部的侧边栏上的 `空间管理 > 内容管理`。
2. 选择导出。只有具有**导出空间**权限的用户才能看到该选项。
3. 选择 HTML，然后选择下一步。
4. 决定是否需要自定义导出：
   - 选择普通导出以生成一个包含您有权限查看的所有页面的 HTML 文件。
   - 选择自定义导出，如果您想导出页面的子集，或者排除评论。
5. 解压缩 ZIP 文件。

**警告**  
请注意，博客不会被导出为 HTML。您需要手动复制它或将其导出为 XML 或 PDF。但是这些格式不能被此工具处理。

# 鸣谢

感谢 meridius。

[pandoc]: http://pandoc.org/installing.html
[pandoc-options]: http://hackage.haskell.org/package/pandoc
[gitit]: https://github.com/jgm/gitit/
[confluence-to-markdown]: https://github.com/meridius/confluence-to-markdown
