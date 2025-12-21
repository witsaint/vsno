# 🧪 Testing Guide

This document provides a comprehensive guide for testing in this TypeScript project.

## 📋 Test Structure

```
tests/
├── setup.ts                 # Global test setup and mocks
├── fixtures/                # Mock data and test fixtures
│   └── mock-data.ts
├── utils/                   # Test utilities and helpers
│   └── test-helpers.ts
├── unit/                    # Unit tests
│   └── main.test.ts
├── integration/             # Integration tests
│   └── webview.test.ts
├── e2e/                     # End-to-end tests
│   └── extension.test.ts
├── performance/             # Performance and benchmark tests
│   └── benchmark.test.ts
└── types/                   # Type-only tests
    └── type-tests.test.ts
```

## 🚀 Quick Start

### Run All Tests
```bash
pnpm test
```

### Run Tests with Coverage
```bash
pnpm test:coverage
```

### Run Tests in Watch Mode
```bash
pnpm test:watch
```

### Open Test UI
```bash
pnpm test:ui
```

## 📊 Test Categories

### Unit Tests (`tests/unit/`)
- Test individual functions and methods
- Fast execution
- Isolated testing
- Mock external dependencies

**Example:**
```typescript
import { describe, expect, it } from 'vitest'
import { main } from '@/index'

describe('main function', () => {
  it('should return "Hello, world!"', () => {
    const result = main()
    expect(result).toBe('Hello, world!')
  })
})
```

### Integration Tests (`tests/integration/`)
- Test component interactions
- Test API integrations
- Test data flow between modules

**Example:**
```typescript
describe('Webview Integration', () => {
  it('should send and receive messages', async () => {
    const webview = new MockFlatWebview()
    await webview.sendAsyncMessage({ name: 'test', params: {} })
    // Assert message was sent
  })
})
```

### End-to-End Tests (`tests/e2e/`)
- Test complete user workflows
- Test extension activation
- Test real-world scenarios

**Example:**
```typescript
describe('Extension E2E', () => {
  it('should activate without errors', async () => {
    const result = await activateExtension()
    expect(result.success).toBe(true)
  })
})
```

### Performance Tests (`tests/performance/`)
- Benchmark function execution
- Memory usage testing
- Stress testing

**Example:**
```typescript
describe('Performance Tests', () => {
  it('should execute quickly', () => {
    const startTime = performance.now()
    main()
    const endTime = performance.now()
    expect(endTime - startTime).toBeLessThan(1)
  })
})
```

### Type Tests (`tests/types/`)
- Test TypeScript type correctness
- Ensure interface compliance
- Test generic types

**Example:**
```typescript
describe('Type Tests', () => {
  it('should have correct return type', () => {
    const result = main()
    const stringResult: string = result // Should compile
    expect(typeof result).toBe('string')
  })
})
```

## 🛠️ Test Utilities

### Test Helpers (`tests/utils/test-helpers.ts`)

#### `createMockWebviewPanel()`
Creates a mock VSCode WebviewPanel for testing.

```typescript
import { createMockWebviewPanel } from '../utils/test-helpers'

const mockPanel = createMockWebviewPanel()
```

#### `createMockExtensionContext()`
Creates a mock VSCode extension context.

```typescript
import { createMockExtensionContext } from '../utils/test-helpers'

const context = createMockExtensionContext()
```

#### `wait(ms)`
Utility for async testing with delays.

```typescript
import { wait } from '../utils/test-helpers'

await wait(100) // Wait 100ms
```

#### `expectToThrow(fn, expectedMessage)`
Assert that a function throws an error.

```typescript
import { expectToThrow } from '../utils/test-helpers'

await expectToThrow(
  () => { throw new Error('Test error') },
  'Test error'
)
```

### Mock Data (`tests/fixtures/mock-data.ts`)

Pre-defined mock data for consistent testing:

```typescript
import { mockVSCodeConfig, mockWebviewMessages } from '../fixtures/mock-data'

const message = mockWebviewMessages.simple
const config = mockVSCodeConfig.extension
```

## ⚙️ Configuration

### Vitest Configuration (`vitest.config.ts`)

```typescript
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
})
```

### Test Setup (`tests/setup.ts`)

Global setup for all tests:
- VSCode API mocking
- Console mocking
- Global test hooks

## 📈 Coverage Reports

### Generate Coverage Report
```bash
pnpm test:coverage
```

### Coverage Thresholds
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

### Coverage Reports Location
- **HTML Report**: `coverage/lcov-report/index.html`
- **JSON Report**: `coverage/coverage-final.json`
- **LCOV Report**: `coverage/lcov.info`

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm test` | Run all tests |
| `pnpm test:run` | Run tests once |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests with coverage |
| `pnpm test:ui` | Open Vitest UI |
| `pnpm test:type` | Run type tests only |
| `pnpm test:performance` | Run performance tests only |
| `pnpm test:integration` | Run integration tests only |
| `pnpm test:e2e` | Run E2E tests only |

## 🎯 Best Practices

### 1. Test Naming
```typescript
describe('ComponentName', () => {
  describe('methodName', () => {
    it('should do something when condition is met', () => {
      // test implementation
    })
  })
})
```

### 2. Arrange-Act-Assert Pattern
```typescript
it('should return correct result', () => {
  // Arrange
  const input = 'test input'
  const expected = 'expected output'

  // Act
  const result = functionUnderTest(input)

  // Assert
  expect(result).toBe(expected)
})
```

### 3. Mock External Dependencies
```typescript
import { vi } from 'vitest'

const mockFunction = vi.fn()
vi.mock('external-module', () => ({
  externalFunction: mockFunction
}))
```

### 4. Test Async Code
```typescript
it('should handle async operations', async () => {
  const result = await asyncFunction()
  expect(result).toBeDefined()
})
```

### 5. Use Descriptive Assertions
```typescript
// Good
expect(result).toHaveProperty('success', true)
expect(array).toContain(expectedItem)

// Avoid
expect(result.success).toBe(true)
expect(array.includes(expectedItem)).toBe(true)
```

## 🐛 Debugging Tests

### Debug Individual Test
```bash
# Run specific test file
pnpm test tests/unit/main.test.ts

# Run specific test with verbose output
pnpm test tests/unit/main.test.ts --reporter=verbose
```

### Debug in VS Code
1. Set breakpoints in test files
2. Use "Debug Test" command in VS Code
3. Or use the debugger statement:
```typescript
it('should debug this test', () => {
  debugger // Execution will pause here
  // test code
})
```

## 📝 Writing New Tests

### 1. Choose the Right Test Type
- **Unit**: Individual functions/methods
- **Integration**: Component interactions
- **E2E**: Complete workflows
- **Performance**: Speed and memory
- **Type**: TypeScript correctness

### 2. Follow the Test Structure
```typescript
import { beforeEach, describe, expect, it } from 'vitest'
import { functionToTest } from '@/module'

describe('ModuleName', () => {
  beforeEach(() => {
    // Setup for each test
  })

  describe('functionToTest', () => {
    it('should handle normal case', () => {
      // Test implementation
    })

    it('should handle edge case', () => {
      // Test implementation
    })

    it('should handle error case', () => {
      // Test implementation
    })
  })
})
```

### 3. Use Test Utilities
```typescript
import { mockWebviewMessages } from '../fixtures/mock-data'
import { createMockWebviewPanel, wait } from '../utils/test-helpers'
```

## 🚨 Common Issues

### 1. Mock Not Working
```typescript
// Make sure to mock before importing
vi.mock('module-name', () => ({
  mockedFunction: vi.fn()
}))
```

### 2. Async Test Timeout
```typescript
it('should complete async operation', async () => {
  // Increase timeout if needed
}, 10000) // 10 seconds
```

### 3. Coverage Not Showing
- Make sure to run `pnpm test:coverage`
- Check that files are not in coverage exclude list
- Verify source files are being imported correctly

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Jest Matchers](https://jestjs.io/docs/expect)
- [VSCode Extension Testing](https://code.visualstudio.com/api/working-with-extensions/testing-extension)

---

Happy Testing! 🎉
