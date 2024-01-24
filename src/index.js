const program = require("commander");
const path = require('path')
const fs = require('fs')
const syncExec = require('sync-exec');

const { loadConfig } = require("./configuration");

const Bootstrap = require('./Bootstrap');

program
  .version(require('../package.json').version)
  .option("--cwd <path>", "工作目录")
  .option(
    "--config <path>",
    "配置文件的路径，没有配置，默认路径是在${cwd}/simple-confluence-to-markdown.config.js"
  )
  .option("--disable-config-file", "是否取配置文件")
  .option("-i, --path-resource <path>", "Confluence导出的html文件路径")
  .option("-o, --path-result <path>", "Markdown文件输出路径")
  .parse(process.argv);

const config = {
  // 工作目录
  cwd: ".",
  // 配置文件的路径，没有配置，默认路径是在${cwd}/simple-confluence-to-markdown.config.js
  config: undefined,
  // 是否取配置文件
  disableConfigFile: false,
  // Confluence导出的html文件路径
  pathResource: "",
  // Markdown文件输出路径
  pathResult: "",
}

Object.assign(config, program);

const CONFIG_JS_FILENAME = "simple-confluence-to-markdown.config.js";

const absoluteCwd = path.resolve(config.cwd);

let configFileOptions = {}

// 优先判断是否需要读取文件
if (!config.disableConfigFile) {
  let disableConfigFilePath = path.join(absoluteCwd, CONFIG_JS_FILENAME);
  if (config.config) {
    disableConfigFilePath = path.resolve(config.config);
  }
  if (fs.existsSync(disableConfigFilePath)) {
    const conf = loadConfig(disableConfigFilePath);
    if (conf) {
      Object.assign(config, conf.options, program);
    }
  }
}

// 兼容此前的参数处理方式
if (!config.pathResource && !config.pathResult) {
  config.pathResource = process.argv[2];
  config.pathResult = process.argv[3];
}

function run () {
  // 检测pandoc是否安装成功
  const out = syncExec('pandoc --version');
  if (out.status > 0) {
    console.log('您还没有安装pandoc. 您可以在终端上执行`pandoc --version`确认是否安装成功')
    return
  }

  // 启动
  var bootstrap = new Bootstrap();
  bootstrap.run(config.pathResource, config.pathResult);
}

run()
