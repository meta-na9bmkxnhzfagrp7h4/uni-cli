let fs = require("fs");

function writeVue(fileName) {
  let template = [
    "<template>",
    `\t<div class=\"${toLine(fileName)}\">`,
    "\t</div>",
    "</template>",
    "<script>",
    `\timport \'.\/${fileName}.less\'`,
    "\texport default{",
    "\t\tname: 'App',",
    "\t\tdata() {",
    "\t\t\treturn {",
    "",
    "\t\t\t}",
    "",
    "\t\t}",
    "\t}",
    "</script>",
  ];

  let str = "";
  for (const key in template) {
    if (Object.hasOwnProperty.call(template, key)) {
      const element = template[key];
      str = str + element + "\n";
    }
  }
  return str;
}

function writeLess(fileName) {
  let template = [`.${toLine(fileName)}{`, "", "}"];
  let str = "";
  for (const key in template) {
    if (Object.hasOwnProperty.call(template, key)) {
      const element = template[key];
      str = str + element + "\n";
    }
  }
  return str;
}

function writeTs(fileName) {
  let template = [
    `import ${fileName} from \'.\/${fileName}.vue\'`,
    `export default ${fileName}`,
  ];
  let str = "";
  for (const key in template) {
    if (Object.hasOwnProperty.call(template, key)) {
      const element = template[key];
      str = str + element + "\n";
    }
  }
  return str;
}

function toLine(name) {
  let names = name.replace(/([A-Z])/g, "_$1").toLowerCase();
  if (names.slice(0, 1) === "_") {
    names = names.slice(1, names.length - 1);
  }
  return names;
}

module.exports = {
  addComponent2: function (path) {
    if (fs.existsSync(path)) {
      console.log("组件已存在");
    } else {
      let dirList = path.split("/");
      let fileName = dirList.pop();
      try {
        fs.mkdirSync(path, { recursive: true });
        fs.writeFileSync(`${path}/${fileName}.vue`, writeVue(fileName));
        fs.writeFileSync(`${path}/${fileName}.less`, writeLess(fileName));
        fs.writeFileSync(`${path}/index.js`, writeTs(fileName));
        console.log(`创建组件${fileName}成功`);
      } catch (e) {
        console.log(e);
      }
    }
  },
};
