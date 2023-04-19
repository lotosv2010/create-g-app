import { red, reset, bold } from 'kolorist'
import prompts from 'prompts'
import fs from 'node:fs'
import path from 'node:path'
import { FRAMEWORKS, Framework } from './frameworks'
import { defaultTargetDir, argv, cwd } from './consts'
import { pkgManager, execCommand } from './command'
import { installPkg } from './insgallPkg'
import { installLog, resultLog } from './log'
import { writeFile, overwriteFile } from './write'
import {
  isValidPackageName,
  getProjectName,
  formatTargetDir,
  isEmpty
} from '../utils'

export default async function create() {
  // 输入的项目名称
  const argTargetDir = formatTargetDir(argv._[0])
  const argTemplate = argv.template || argv.t
  
  // 目标名称
  let targetDir = argTargetDir || defaultTargetDir

  // 模板集合
  const TEMPLATES = FRAMEWORKS.map(
    (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name]
  ).reduce((a, b) => a.concat(b), [])
  
  // 用户输入的结果
  let result: prompts.Answers<
    'projectName' | 'overwrite' | 'packageName' | 'framework' | 'variant'
  >

  try {
    result = await prompts(
      [
        { // 项目名称
          type: argTargetDir ? null : 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir
          }
        },
        { // 是否覆盖
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
          name: 'overwrite',
          message: () =>
            (targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`) +
            ` is not empty. Remove existing files and continue?`
        },
        { // 取消
          type: (_, { overwrite }: { overwrite?: boolean }) => {
            if (overwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled')
            }
            return null
          },
          name: 'overwriteChecker'
        },
        { // 项目名称
          type: () => (isValidPackageName(getProjectName(targetDir)).valid ? null : 'text'),
          name: 'packageName',
          message: reset('Package name:'),
          initial: defaultTargetDir, 
          validate: (dir) => {
            const {valid, problems } = isValidPackageName(dir)
            let result = ''
            problems?.forEach(p => {
              result +=`    ${bold(red('*'))} ${p}`
            })
            return (valid || result)
          }
        },
        { // 框架选择
          type:
            argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
          name: 'framework',
          message:
            typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
              ? reset(
                  `"${argTemplate}" isn't a valid template. Please choose from below: `
                )
              : reset('Select a framework:'),
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color
            return {
              title: frameworkColor(framework.display || framework.name),
              value: framework
            }
          })
        },
        { // 模板选择
          type: (framework: Framework) =>
            framework && framework.variants ? 'select' : null,
          name: 'variant',
          message: reset('Select a variant:'),
          choices: (framework: Framework) =>
            framework.variants.map((variant) => {
              const variantColor = variant.color
              return {
                title: variantColor(variant.display || variant.name),
                value: variant.name
              }
            })
        }
      ],
      { // 取消
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        }
      }
    )
  } catch (cancelled: any) {
    console.log(cancelled.message)
    return
  }

  const { framework, overwrite, packageName, variant } = result
  const root = path.join(cwd, targetDir)

  // 覆盖
  overwriteFile(overwrite, root)
  
  // determine template
  const template: string = variant || framework?.name || argTemplate
  const pkName = packageName || getProjectName(targetDir)
  // 执行指令
  execCommand(FRAMEWORKS, template, targetDir)

  console.log(`\nScaffolding project in ${root}...`)

  // 拷贝模板
  writeFile(root, template, pkName, targetDir)

  installLog()

  // 安装依赖
  await installPkg({
    appPath: root,
    pkgManager,
  });

  // 提示
  resultLog(pkName, pkgManager, root)
}