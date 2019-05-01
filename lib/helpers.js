const chalk = require('chalk');

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
	const match = name.match(/[^\/]+\d+/);

	return toUpperWords(match[0] || name);
};

const printSeparator = length =>
	console.log(chalk.dim(new Array(length).join('─')));

const printTitle = title => {
	title = humanizeTestName(title);

	console.log(chalk.magenta.bold(title));
	printSeparator(title.length + 1);
};

module.exports = {
	isWindows,
	die,
	toUpperWords,
	humanizeTestName,
	printSeparator,
	printTitle
};
