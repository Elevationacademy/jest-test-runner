const chalk = require('chalk');

const { isWindows } = require('./helpers');

const ICONS = {
	failed: chalk.bold.red(isWindows ? '\u00D7' : '\u2715'),
	passed: chalk.bold.green(isWindows ? '\u221A' : '\u2713')
};

const TESTS_FOLDER = './tests';

// messages
const NO_TESTS = 'There are no available tests.';
const NO_FAILED_TESTS = `All good, you can go to the beach. ${chalk.bold.green(
	':)'
)}`;

const NO_FAILED_TESTS_ACTIVITY = `  ${chalk.bold.green(
	ICONS.passed
)} No failing tests.`;
const PROMPT_MESSAGE = 'Which activity do you want to test?';
const PROMPT_CHOICE_ALL = "Everything, cause I'm freaking awesome";

module.exports = {
	ICONS,
	TESTS_FOLDER,
	NO_FAILED_TESTS,
	NO_TESTS,
	PROMPT_MESSAGE,
	PROMPT_CHOICE_ALL,
	NO_FAILED_TESTS_ACTIVITY
};
