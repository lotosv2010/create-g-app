import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { copy } from './copy'
import { renameFiles } from './consts'
import { emptyDir } from '../utils'

export const overwriteFile = (overwrite: boolean, root: string) => {
  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }
}

export const writeFile = (root: string, template: string, packageName: string, targetDir: string) => {
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../../templates',
    `${template}`
  )

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8')
  )

  pkg.name = packageName

  write('package.json', JSON.stringify(pkg, null, 2))
}