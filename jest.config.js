module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "<rootDir>/src"],

  // configure coverage
  collectCoverage: true,
  coverageReporters: ["json", "html"],
};
