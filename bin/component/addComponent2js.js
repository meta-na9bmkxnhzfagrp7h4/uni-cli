
let fs = require('fs')

function writeVue(fileName) {
    let template = [
        "<template>",
        `\t<div class=\"${fileName}\">`,
        "\t</div>",
        "</template>",
        "<script>",
        "\timport {reactive, toRefs, defineComponent} from 'vue'",
        `\timport \'.\/${fileName}.less\'`,
        "\texport default defineComponent({",
        "\t\tname: 'App',",
        "\t\tsetup() {",
        "\t\t\tconst data = reactive({",
        "",
        "\t\t\t})",
        "",
        "\t\t\treturn {",
        "\t\t\t\t...toRefs(data)",
        "\t\t\t}",
        "\t\t}",
        "\t})",
        "</script>",
    ]

    let str = ''
    for (const key in template) {
        if (Object.hasOwnProperty.call(template, key)) {
            const element = template[key];
            str = str + element + '\n'
        }
    }
    return str
}

function writeLess(fileName) {
    let template = [
        `.${fileName}{`,
        '',
        '}'
    ]
    let str = ''
    for (const key in template) {
        if (Object.hasOwnProperty.call(template, key)) {
            const element = template[key];
            str = str + element + '\n'
        }
    }
    return str
}

function writeTs(fileName) {
    let template = [
        `import ${fileName} from \'.\/${fileName}.vue\'`,
        `export default ${fileName}`
    ]
    let str = ''
    for (const key in template) {
        if (Object.hasOwnProperty.call(template, key)) {
            const element = template[key];
            str = str + element + '\n'
        }
    }
    return str
}

module.exports = {
    addComponent2js: function(path) {
        if (fs.existsSync(path)) {
            console.log('组件已存在');
        } else {
            let dirList = path.split('/')
            let fileName = dirList.pop()
            try {
                fs.mkdirSync(path, {recursive: true})
                fs.writeFileSync(`${path}/${fileName}.vue`, writeVue(fileName))
                fs.writeFileSync(`${path}/${fileName}.less`, writeLess(fileName))
                fs.writeFileSync(`${path}/index.js`, writeTs(fileName))
                console.log(`创建组件${fileName}成功`);
            } catch (e) {
                console.log(e);
            }
        }
    }
}
