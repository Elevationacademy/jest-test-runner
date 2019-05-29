const chalk = require('chalk');
const path = require('path');

const isWindows = process.platform === 'win32';

const die = message => {
	console.log(chalk.bold.red(message));
	process.exit(1);
};

const toUpperWords = value =>
	value
		.toLowerCase()
		.split('-')
		.map(s => s.charAt(0).toUpperCase() + s.substring(1))
		.join(' ');

const humanizeTestName = name => {
	const splittedPath = name.split(/[\/\\]/);
	const file = splittedPath.pop().replace('.test.js', '');
	const dir = splittedPath.pop();

	return toUpperWords(/\d/.test(dir) ? dir : file);
};

const printSeparator = length =>
	console.log(chalk.dim(new Array(length).join('─')));

const printTitle = title => {
	title = humanizeTestName(title);

	console.log(chalk.magenta.bold(title));
	printSeparator(title.length + 1);
};

const getRepoName = () => {
	let studentRepoName = path.basename(path.resolve(''));
	return studentRepoName.substr(0, studentRepoName.indexOf('-ex-'));
};

module.exports = {
	isWindows,
	die,
	toUpperWords,
	humanizeTestName,
	printSeparator,
	printTitle,
	getRepoName
};
