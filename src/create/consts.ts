import minimist from 'minimist'

export const defaultTargetDir = 'g-project'
export const argv = minimist<{
  t?: string
  template?: string
}>(process.argv.slice(2), { string: ['_'] })
export const cwd = process.cwd()
export const userAgent = process.env.npm_config_user_agent
export const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore'
}