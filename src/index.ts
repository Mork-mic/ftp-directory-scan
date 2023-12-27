import { setFailed, getInput, getBooleanInput } from '@actions/core';
import { Client } from 'basic-ftp';
import { readFile, writeFile } from 'fs/promises';

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
    const fileNames = items.map(item => item.name).filter(name => name !== 'content.json');
    await writeFile('content.json', JSON.stringify(fileNames));
    console.log(await readFile('content.json'));
    //await client.uploadFrom('content.json', getInput('server-dir'));
    client.close();
}

run().catch(error => setFailed(error.message ?? error));