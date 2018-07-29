import * as fs from 'fs';
import * as vscode from 'vscode';


export default () => {

    var rootPath = vscode.workspace.workspaceFolders[0].uri.path

    const path = `${rootPath}/CODEOWNERS`
    return fs.existsSync(path) ? fs.readFileSync(path, 'utf-8') : null
}