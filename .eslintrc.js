module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		project: './tsconfig.json',
	},
	rules: {
		// Disabled Rules
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-magic-numbers': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-type-alias': 'off',
		'@typescript-eslint/no-require-imports': 'off',
		'@typescript-eslint/prefer-interface': 'off',
		// Enabled rules
		'@typescript-eslint/adjacent-overload-signatures': 'error',
		'@typescript-eslint/array-type': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/member-ordering': 'error',
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "default", format: ["camelCase"]
      },
      {
        selector: "variableLike", format: ["camelCase"]
      },
      {
        selector: "variable", format: ["camelCase", "UPPER_CASE", "PascalCase"]
      },
      {
        selector: "parameter", format: ["camelCase"], leadingUnderscore: "allow"
      },
      {
        selector: "memberLike", format: ["camelCase", "PascalCase"]
      },
      {
        selector: "memberLike", modifiers: ["private"], format: ["camelCase", "PascalCase"], leadingUnderscore: "require"
      },
      {
        selector: "typeLike", format: ["PascalCase"]
      },
      {
        selector: "typeParameter", format: ["PascalCase"], prefix: ["T"]
      },
      {
        selector: "interface", format: ["PascalCase"], custom: { regex: "^I[A-Z]", match: false }
      }
    ],
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-unnecessary-type-assertion': 'error',
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-unnecessary-qualifier': 'error',
		'@typescript-eslint/no-parameter-properties': 'error',
		'@typescript-eslint/no-misused-new': 'error',
		'@typescript-eslint/no-for-in-array': 'error',
		'@typescript-eslint/no-var-requires': 'error',
		'@typescript-eslint/prefer-function-type': 'error',
		'@typescript-eslint/promise-function-async': 'error',
		'@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/triple-slash-reference': 'error',
		'@typescript-eslint/type-annotation-spacing': 'error',
		'@typescript-eslint/unified-signatures': 'error',
		complexity: ['error', { max: 3 }],
		'max-depth': ['error', { max: 4 }],
		'prefer-const': [
			'error',
			{
				destructuring: 'all',
				ignoreReadBeforeAssign: true,
			},
		],
	},
};
