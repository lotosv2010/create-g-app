import { green, cyan } from 'kolorist'
import path from 'node:path';
import { cwd } from './consts'

export const installLog =() => {
  console.log('Installing packages. This might take a couple of minutes.');
  console.log();
}

export const resultLog = (proectName: string, pkgManager: string, root: string) => {
  console.log(`${green('Success!')} Created ${proectName} at ${root}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log(cyan(`  ${pkgManager} dev`));
  console.log('    Starts the development server.');
  console.log();
  console.log(cyan(`  ${pkgManager} build`));
  console.log('    Builds the app for production.');
  console.log();
  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(cyan('  cd'), `${path.relative(cwd, root)}`);
  console.log(
    `  ${cyan(`${pkgManager} dev`)}`
  );
  console.log();
}