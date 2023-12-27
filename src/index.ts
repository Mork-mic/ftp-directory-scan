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

    const pattern = getInput('exclude-regex');
    const regex = new RegExp(pattern);
    const fileNames = items.filter(item => !(
        (!getBooleanInput('include-subdirectories') && item.isDirectory) ||
        (!getBooleanInput('include-files') && item.isFile) ||
        (!getBooleanInput('include-symlinks') && item.isSymbolicLink) ||
        (pattern !== null && regex.test(item.name))   
    )).map(item => item.name);
    
    const readable = Readable.from([ JSON.stringify(fileNames) ]);
    await client.uploadFrom(readable, getInput('out-path'));

    client.close();
}

run().catch(error => setFailed(error.message ?? error));