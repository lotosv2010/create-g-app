
import {
  blue,
  cyan,
  green,
  lightGreen,
  lightRed,
  magenta,
  red,
  yellow
} from 'kolorist'

export type ColorFunc = (str: string | number) => string
export type Framework = {
  name: string
  display: string
  color: ColorFunc
  variants: FrameworkVariant[]
}
export type FrameworkVariant = {
  name: string
  display: string
  color: ColorFunc
  customCommand?: string
}

export const FRAMEWORKS: Framework[] = [
  {
    name: 'vite',
    display: 'Vite',
    color: yellow,
    variants: [
      {
        name: 'vite',
        display: 'Vite ↗',
        color: yellow,
        customCommand: 'pnpm create vite TARGET_DIR'
      }
    ]
  },
  {
    name: 'react',
    display: 'React',
    color: green,
    variants: [
      {
        name: 'react',
        display: 'JavaScript',
        color: yellow,
        customCommand: 'pnpm create react-app TARGET_DIR'
      },
      {
        name: 'react-ts',
        display: 'TypeScript',
        color: blue,
        customCommand: 'pnpm create react-app TARGET_DIR --template typescript'
      },
      {
        name: 'next',
        display: 'Next ↗',
        color: green,
        customCommand: 'pnpm create next-app TARGET_DIR'
      },
      {
        name: 'remix',
        display: 'Remix ↗',
        color: lightGreen,
        customCommand: 'pnpm create remix TARGET_DIR'
      },
      {
        name: 'gatsby',
        display: 'Gatsby ↗',
        color: lightRed,
        customCommand: 'pnpm create gatsby TARGET_DIR'
      },
      {
        name: 'expo',
        display: 'Expo ↗',
        color: red,
        customCommand: 'pnpm create expo-app TARGET_DIR'
      }
    ]
  },
  {
    name: 'admin',
    display: 'Admin',
    color: cyan,
    variants: [
      {
        name: 'admin-vue',
        display: 'Admin-Vue',
        color: yellow
      },
      {
        name: 'admin-react',
        display: 'Admin-React',
        color: blue
      }
    ]
  },
  {
    name: 'mobile',
    display: 'Mobile',
    color: magenta,
    variants: [
      {
        name: 'mobile-vue',
        display: 'Mobile',
        color: yellow,
      }
    ]
  }
]