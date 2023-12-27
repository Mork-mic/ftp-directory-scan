import { setFailed, getInput, getBooleanInput } from '@actions/core';
import { Client } from 'basic-ftp';
import { Readable } from 'stream';

async function run() {
    const client = new Client(+getInput('timeout'));
    client.ftp.verbose = getBooleanInput('verbose');

    await client.access({
        host: getInput('server'),
        user: getInput('user'),
        password: getInput('password'),
        port: +getInput('port'),
        secure: getBooleanInput('secure')
    });
    const items = await client.list(getInput('server-dir'));

    console.log('TEST')
    const pattern = getInput('exclude-regex');
    const regex = new RegExp(pattern);
    console.log('TEST0')
    const fileNames = items.filter(item => !(
        (!getBooleanInput('include-directories') && item.isDirectory) ||
        (!getBooleanInput('include-files') && item.isFile) ||
        (!getBooleanInput('include-symlinks') && item.isSymbolicLink) ||
        (pattern !== null && regex.test(item.name))   
    )).map(item => item.name);
    
    console.log('TESTTEST')
    const readable = Readable.from([ JSON.stringify(fileNames) ]);
    console.log('TEST2')
    await client.uploadFrom(readable, getInput('out-path'));

    client.close();
}

run().catch(error => setFailed(error.message ?? error));