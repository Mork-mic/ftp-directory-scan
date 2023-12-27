import { setFailed, getInput } from '@actions/core';
import { test } from './main';

try {
    test(+getInput('port'), getInput('host'))
} catch (error) {
    setFailed((error as any).message);
}