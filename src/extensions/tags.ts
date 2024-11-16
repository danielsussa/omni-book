

const hashtagsDB = new Set(["#JavaScript", "#TypeScript", "#CodeMirror", "#WebDevelopment"]);

export function getHashTags():Set<string>{
    return hashtagsDB
}

export function addHashTags(tag: string){
    if (hashtagsDB.has(tag)) {
        return
    }
    hashtagsDB.add(tag)
}