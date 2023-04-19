import spawn from 'cross-spawn';

type Params = {
  appPath: string;
  pkgManager: string;
};

export async function installPkg({ appPath, pkgManager }: Params): Promise<void> {
  return new Promise((resolve, reject) => {
    process.chdir(appPath);

    const args = pkgManager === 'yarn' ? [] : ['install'];
    const child = spawn(pkgManager, args, {
      stdio: 'inherit',
      env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
    });

    child.on('close', code => {
      if (code !== 0) {
        reject({ command: `${pkgManager} ${args.join(' ')}` });
        return;
      }
      resolve();
    })
  });
}