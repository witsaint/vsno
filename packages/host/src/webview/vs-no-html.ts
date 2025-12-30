import type { BundleHtmlOptions } from './get-html'
import path from 'node:path'

/**
 * Get the options to pass to the get HTML by bundle request.
 * @param moduleName
 * @returns The options to pass to the get HTML by bundle request.
 */
export function vsnoHtmlOpt(moduleName: string): Pick<BundleHtmlOptions, 'htmlPath' | 'resources'> {
  const output = path.join('public', moduleName)
  return {
    htmlPath: path.join(output, 'index.html'),
    resources: [
      {
        src: 'bundle.js',
        sourcePath: path.join(output, 'bundle.js'),
      },
      {
        src: 'bundle.css',
        sourcePath: path.join(output, 'bundle.css'),
      },
    ],
  }
}
