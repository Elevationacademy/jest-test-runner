const chalk = require('chalk');

const { humanizeTestName, printTitle } = require('./helpers');
const {
	NO_FAILED_TESTS,
	NO_FAILED_TESTS_ACTIVITY,
	ICONS
} = require('./consts');

class TestReporter {
	onRunStart() {
		console.log();
	}

	onRunComplete(
		test,
		{
			numTotalTestSuites,
			numPassedTestSuites,
			numFailedTestSuites,
			testResults: testSuites
		}
	) {
		this._sortByName(testSuites);

		if (!numFailedTestSuites) {
			console.log(NO_FAILED_TESTS);
			return;
		}

		this._printIndividualActivity(testSuites);
		this._printTotals(
			numTotalTestSuites,
			numPassedTestSuites,
			numFailedTestSuites
		);

		process.exit(0);
	}

	_sortByName(testSuites) {
		testSuites.sort((result1, result2) => {
			const testName1 = humanizeTestName(result1.testFilePath);
			const testName2 = humanizeTestName(result2.testFilePath);

			if (testName1 < testName2) return -1;
			if (testName1 > testName2) return 1;
			return 0;
		});
	}

	_printIndividualActivity(testSuites) {
		for (let { testFilePath, numFailingTests, testResults } of testSuites) {
			printTitle(testFilePath);

			if (!numFailingTests) {
				console.log(NO_FAILED_TESTS_ACTIVITY);
			} else {
				for (let { title, status } of testResults) {
					console.log(`  ${ICONS[status]} ${title}`);
				}
			}

			console.log();
		}
	}

	_printTotals(numTotalTestSuites, numPassedTestSuites, numFailedTestSuites) {
		console.log();

		console.log(
			`${chalk.bold.red(`${numFailedTestSuites} failed`)}, ${chalk.bold.green(
				`${numPassedTestSuites} passed`
			)}, ${numTotalTestSuites} total`
		);
	}
}

module.exports = TestReporter;
