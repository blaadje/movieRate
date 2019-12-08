module.exports = {
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@containers/(.*)$': '<rootDir>/src/containers/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@views/(.*)$': '<rootDir>/src/views/$1',
    '^@settings/(.*)$': '<rootDir>/src/settings/$1',
    '.+\\.(css|styl|svg|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
}
