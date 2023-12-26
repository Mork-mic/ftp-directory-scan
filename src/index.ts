import core from '@actions/core';

try {
    const input = core.getInput('port');
    console.log('PORT: ' + input);
} catch (error) {
    core.setFailed((error as any).message);
}