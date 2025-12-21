<div align="center">

# 🎯 @vsno Monorepo

**VSCode extension monorepo with `@vsno/webview` and `@vsno/host` packages**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

[🧪 Testing Guide](./docs/TESTING.md) • [🚀 Getting Started](#-getting-started) • [📦 Packages](#-packages) • [🛠️ Development](#️-development)

</div>

---

## ✨ Features

- 📦 **Monorepo** — Managed via PNPM workspaces (`packages/*`)
- 🔧 **TypeScript First** — Strict config shared across packages
- ⚡ **Fast Build** — [unbuild](https://github.com/unjs/unbuild) per package
- 🧪 **Testing Ready** — [Vitest](https://vitest.dev/) per package
- 📏 **Code Quality** — ESLint with [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## 🚀 Getting Started

### Prerequisites

- Node.js (recommended v24)
- PNPM

### Install & Build

```bash
# install deps from repo root
pnpm install

# build all packages
pnpm -r build

# run tests for all packages
pnpm -r test
```

## 📦 Packages

### @vsno/webview

Webview utilities and scaffolding.

Usage:

```ts
import { initWebview } from '@vsno/webview'

initWebview()
```

### @vsno/host

Host-side helpers for extension integration.

Usage:

```ts
import { initHost } from '@vsno/host'

initHost()
```

## 🛠️ Development

### Workspace Scripts (root)

- `pnpm -r build` — 构建所有包
- `pnpm -r test` — 运行所有包测试
- `pnpm -r typecheck` — TypeScript 检查
- `pnpm -r lint` — ESLint 检查

### Per-Package Scripts

在对应包目录执行：

- `pnpm dev` — 开发模式（unbuild --dev）
- `pnpm build` — 生产构建
- `pnpm test` — 单包测试
- `pnpm typecheck` — 单包类型检查

## 📁 Project Structure

```
vsno/
├── packages/
│   ├── host/
│   │   ├── src/
│   │   ├── test/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   └── webview/
│       ├── src/
│       ├── test/
│       ├── package.json
│       ├── tsconfig.json
│       └── vitest.config.ts
├── docs/
├── scripts/
├── pnpm-workspace.yaml
├── tsconfig.json
└── package.json (name: @vsno/vsno)
```

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

Made with ❤️ by VSNO Team

</div>
