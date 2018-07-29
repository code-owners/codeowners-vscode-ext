import ignore from 'ignore'

export type CodeownersEntry = {
    path: string;
    owners: string[];
};

const mapCodeownersFile = (codeownersFileContent: string): CodeownersEntry[] => {
    return codeownersFileContent
        .split('\n')
        .filter(x => x && !x.startsWith('#'))
        .map(x => {
            const line = x.trim();
            const [path, ...owners] = line.split(/\s+/);
            return {path, owners};
        });
};

export default  class CodeOwners {
    codeownersContent: string; 
    codeownersMap: CodeownersEntry[]; 
    
    constructor(codeownersContent: string) {
        this.codeownersContent = codeownersContent
        this.codeownersMap = mapCodeownersFile(codeownersContent);
    }

    getOwners(path: string): string[] {
        const match = this.codeownersMap
            .slice()
            .reverse()
            .find(x =>
                ignore()
                    .add(x.path)
                    .ignores(path)
            );
        return match.owners;
    }
}