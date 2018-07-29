'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import findCodeownersFile from './utils/findCodeownersFile';
import CodeOwners from './codeowners';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.error('workspaceFolder', vscode.workspace.workspaceFolders[0].uri.path);
    // console.error('extensionDevelopmentPath', process.env.extensionDevelopmentPath);

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.activateCodeowners', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        const codeownersFile = findCodeownersFile()
        codeownersFile ? vscode.window.showInformationMessage('Found CODEOWNERS file') : vscode.window.showWarningMessage('No CODEOWNERS file available')
        const codeowners = new CodeOwners(codeownersFile) 

        var window = vscode.window.activeTextEditor;
        var currentlyOpenTabfilePath = window ? window.document.fileName : 'unknown';
        
        console.log('here !', currentlyOpenTabfilePath)
        try {
            const owners = codeowners.getOwners(currentlyOpenTabfilePath)
            console.log(`${owners ? 'found owners!!' : 'no owners'}`)
        } catch (error) {
            console.error('oops', error)
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}