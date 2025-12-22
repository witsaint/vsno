import process from 'node:process'
import { defineBuildConfig } from 'unbuild'

const isDev = process.argv.includes('--dev')

export default defineBuildConfig({
  entries: ['src/index'],
  declaration: true,
  clean: true,
  externals: ['vscode'],
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: !isDev,
      jsx: 'transform',
      jsxFactory: 'vscpp',
      jsxFragment: 'vscppf',
    },
  },
  hooks: {
    'build:done': () => {},
  },
})
