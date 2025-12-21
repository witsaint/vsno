// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    pnpm: true,
    markdown: {
      overrides: {
        'no-debugger': 'off',
      },
    },
  },
)
