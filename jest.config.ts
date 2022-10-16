/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    // Stop running tests after `n` failures
    bail: 1,

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: [
        '/app/',
        '/bin/',
        '/config/',
        '/dist/',
        '/node_modules/',
        '/tests/coverage/',
        '/tests/fixtures/',
    ],

    // A map from regular expressions to paths to transformer
    // transform: undefined,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },

    // Indicates whether each individual test should be reported during the run
    verbose: false,
};
