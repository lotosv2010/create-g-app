import path from 'path';

export const getProjectName = (targetDir: string) =>
  targetDir === '.' ? path.basename(path.resolve()) : targetDir

export function formatTargetDir(targetDir: string | undefined) {
    return targetDir?.trim().replace(/\/+$/g, '')
  }