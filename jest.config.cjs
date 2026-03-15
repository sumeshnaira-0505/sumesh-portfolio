/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      lines: 40,
      functions: 20,
      branches: 25,
      statements: 40,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^react-tsparticles$': '<rootDir>/__mocks__/react-tsparticles.cjs',
    '^@tsparticles/react$': '<rootDir>/__mocks__/@tsparticles/react.cjs',
    '^@tsparticles/(.*)$': '<rootDir>/__mocks__/tsparticles.cjs',
    '^tsparticles$': '<rootDir>/__mocks__/tsparticles.cjs',
    '^lottie-react$': '<rootDir>/__mocks__/lottie-react.cjs',
    '^canvas-confetti$': '<rootDir>/__mocks__/canvas-confetti.cjs',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$': '<rootDir>/__mocks__/fileMock.cjs',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.test.json',
      },
    ],
  },
  testMatch: ['**/__tests__/**/*.{ts,tsx}', '**/*.{spec,test}.{ts,tsx}'],
}

module.exports = config
