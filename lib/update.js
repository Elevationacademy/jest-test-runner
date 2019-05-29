'use strict';

const fs = require('fs');
const git = require('simple-git/promise');

const { die } = require('./core/helpers');
const {
	TESTS_FOLDER,
	DEFAULT_COMMIT_MESSAGE,
	UPDATE_SUCCEEDED,
	UPDATE_FAILED
} = require('./core/consts');

// get commit message if supplied, or return the default message
const getCommitMessage = () => {
	const argPosition = process.argv.indexOf('-m');

	if (argPosition < 0) {
		return DEFAULT_COMMIT_MESSAGE;
	}

	return process.argv[argPosition + 1];
};

// add-commit-push changes in .hg folder
const handle = async () => {
	if (
		!fs.existsSync(TESTS_FOLDER) ||
		!(await git(TESTS_FOLDER).checkIsRepo())
	) {
		die(UPDATE_FAILED);
	}

	const repo = git(TESTS_FOLDER);

	await repo.add('.');
	await repo.commit(getCommitMessage());
	await repo.push();

	console.log(UPDATE_SUCCEEDED);
};

module.exports = {
	handle
};
