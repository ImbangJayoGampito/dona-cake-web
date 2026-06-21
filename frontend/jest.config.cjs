module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', {
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript'
      ]
    }],
    '^.+\\.(js|jsx)$': 'babel-jest',
    // This handles ALL static files
    '\\.(jpg|jpeg|png|gif|webp|svg|ico|eot|otf|ttf|woff|woff2)$': '<rootDir>/file-transformer.cjs',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(axios|@testing-library)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};