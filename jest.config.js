module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  modulePaths: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "js"],
  coverageReporters: ["cobertura", "lcov", "text-summary", "html"],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 75,
      lines: 80,
      statements: 80,
    },
  },
};
