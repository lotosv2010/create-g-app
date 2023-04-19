import { pkgFromUserAgent } from '../utils'
import spawn from 'cross-spawn'

export const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
export const pkgManager = pkgInfo ? pkgInfo.name : 'npm'
export const isYarn1 = pkgManager === 'yarn' && pkgInfo?.version.startsWith('1.')

export function formatCommand(customCommand: string, targetDir: string) {
  return customCommand
  .replace('TARGET_DIR', targetDir)
  .replace(/^npm create/, `${pkgManager} create`)
  // Only Yarn 1.x doesn't support `@version` in the `create` command
  .replace('@latest', () => (isYarn1 ? '' : '@latest'))
  .replace(/^npm exec/, () => {
    // Prefer `pnpm dlx` or `yarn dlx`
    if (pkgManager === 'pnpm') {
      return 'pnpm dlx'
    }
    if (pkgManager === 'yarn' && !isYarn1) {
      return 'yarn dlx'
    }
    // Use `npm exec` in all other cases,
    // including Yarn 1.x and other custom npm clients.
    return 'npm exec'
  })
}

export function execCommand(FRAMEWORKS: any[], template: string, targetDir: string) {
  const { customCommand } =
  FRAMEWORKS.flatMap((f) => f.variants).find((v) => v.name === template) ?? {}

  if (customCommand) {
    const fullCustomCommand = formatCommand(customCommand, targetDir)
    const [command, ...args] = fullCustomCommand.split(' ')
    const { status } = spawn.sync(command, args, {
      stdio: 'inherit'
    })
    process.exit(status ?? 0)
  }
}