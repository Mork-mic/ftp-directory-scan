# ftp-directory-scan
Scans an FTP directory and stores all file names in a .json file.

## Usage Example
Place the following in `/.github/workflows/youractionname.yml`
```yml
name: Generate content file

on:
 workflow_dispatch:

jobs:
 ftp-scan:
   runs-on: ubuntu-latest

   steps:
   - name: Checkout code
     uses: actions/checkout@v4.1.1

   - name: FTP Directory Scan
     id: ftp-scan
     uses: tobilinz/ftp-directory-scan@v1.2.0
     with:
      server: ftp.tobl.in
      user: tobias
      password: ${{ secrets.FTP_PASSWORD }}
      server-dir: somedir/mydir
      out-path: somedir/mydir/content.json
```

## Settings
| Key Name              | Required | Example                | Default Value | Description               |
|-----------------------|----------|------------------------|---------------|---------------------------|
| `server`              | Yes      | `ftp.tobl.in`          |               | ftp server                |
| `user`                | Yes      | `tobias`               |               | ftp user name             |
| `password`            | Yes      | `123456`               |               | ftp password              |
| `port`                | No       | `32`                   | `21`          | Server port to connect to |
| `secure`              | No       | `false`                | `true`        | `false`: Uses plain ftp. Provides no encryption. `true`: Uses ftps. Provides full encryption. |
| `timeout`             | No       | `70000`                | `30000`       | Timeout in milliseconds that will be used for any connection made. `0` means `no timeout` |
| `verbose`             | No       | `true`                 | `false`       | If you encounter a problem, it may help to log out all communication |
| `server-dir`.         | Yes      | `path/to`              |               | Path and Path to the directory to scan on the server |
| `out-path`            | Yes      | `path/to/content.json` |               | Path of the file that will contain the directory information. File name must be included |
| `exclude-regex`       | No       | `content.json`         |               | Regex that specifies what file names should be excluded |
| `include-files`       | No       | `false`                | `true`        | Wether to include file names in the output list |
| `include-directories` | No       | `false`                | `true`        | Wether to include directory names in the output list |
| `include-symlinks`    | No       | `false`                | `true`        | Wether to include symlink names in the output list |
| `sort`                | No       | `true`                 | `false`       | Wether to sort the names or not |
