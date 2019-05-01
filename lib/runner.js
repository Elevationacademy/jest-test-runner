'use strict';

const fs = require('fs');
const path = require('path');
const readdirp = require('readdirp');
const { runCLI } = require('jest');
const inquirer = require('inquirer');
// const inquirerAutocompletePrompt = require('inquirer-autocomplete-prompt');

const { die, humanizeTestName, isWindows } = require('./helpers');
const { TESTS_FOLDER, PROMPT_MESSAGE, PROMPT_CHOICE_ALL } = require('./consts');

// hide 'Determining test suites to run...' message
process.env.TERM = 'dumb';

// show the prompt and execute the tests
const handle = async () => {
	const tests = await readdirp.promise(TESTS_FOLDER);

	if (!tests.length) {
		die(NO_TESTS);
	}

	const testNames = tests.map(t => humanizeTestName(t.path));
	const selected = await selectTestPrompt(testNames);

	const testIndex = testNames.findIndex(t => t === selected);
	const selectedTestPath = testIndex >= 0 ? tests[testIndex].path : '';

	await runTest(selectedTestPath);
};

// run jest on the selected test/all
const runTest = async testPath => {
	if (isWindows) {
		testPath = testPath.replace('\\', '/');
	}

	const ex = `${TESTS_FOLDER}/${testPath}`;

	let testsToRun = [];

	if (fs.existsSync(ex)) {
		testsToRun.push(ex);
	}

	await runCLI(
		{
			_: testsToRun,
			verbose: false,
			silent: true,
			reporters: [path.join(__dirname, 'reporter.js')]
		},
		[path.resolve('./jest.config.js')]
	);
};

// function to resolve test results for the autocomplete
const searchTest = testNames => {
	return (currentTestNames, input) => {
		const choices = [PROMPT_CHOICE_ALL, ...testNames];

		return new Promise((resolve, reject) => {
			if (!input) {
				resolve(choices);
			}

			resolve(
				choices.filter(c => c.toLowerCase().indexOf(input.toLowerCase()) >= 0)
			);
		});
	};
};

// show promot to select a from the available tests
// const selectTestPrompt = async testNames => {
// 	inquirer.registerPrompt('autocomplete', inquirerAutocompletePrompt);

// 	const { selected } = await inquirer.prompt({
// 		type: 'autocomplete',
// 		name: 'selected',
// 		message: PROMPT_MESSAGE,
// 		source: searchTest(testNames)
// 	});

// 	return selected;
// };
const selectTestPrompt = async testNames => {
	// inquirer.registerPrompt('list', inquirerAutocompletePrompt);

	const { selected } = await inquirer.prompt({
		type: 'list',
		name: 'selected',
		message: PROMPT_MESSAGE,
		choices: [PROMPT_CHOICE_ALL, ...testNames]
	});

	return selected;
};

module.exports = { handle };
