import { Socket } from 'net';
import * as fs from 'fs';
import * as util from 'util';

export function test(port: number, host: string) {
    const client = new Socket();

    client.connect(port, host, () => {
        console.log('Connected to the FTP server.');
    });
}