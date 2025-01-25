import { Tag } from "../context/ThreadsContext";

// Verify that tag is alphanumeric
export function verifyTagString(tagString: string): boolean {
    for (var i = 0; i < tagString.length; i++) {
        const charCode = tagString.charCodeAt(i);
        if (!(charCode > 47 && charCode < 58) &&
            !(charCode > 64 && charCode < 91) && 
            !(charCode > 96 && charCode < 123))
            return false;
    }
    return true;
}

// parse tags from a tagString in thread into an array of Tag objects
export function parseTags(tagsString: string): Tag[] {
    if (!tagsString) return [];
    
    const tagsAsStr: string[] = tagsString.split(" ");
    const tags: Tag[] = new Array<Tag>(tagsAsStr.length);
    var idx = 0;

    tagsAsStr.map((tagStr) => {
        if (tagStr) {
            tags[idx] = { body: tagStr };
            idx++;
        }
    });
    return tags;
}

// convert array of Tag objects into a string of tags separated by " "
export function stringifyTags(tags: Tag[]): string {
    const tagsAsStr: string[] = new Array<string>(tags.length);
    var idx = 0;

    tags.map((tag) => {
        if (tag.body) {
            tagsAsStr[idx] = tag.body;
            idx++;
        }
    });
    return tagsAsStr.join(" ");
}

export function tagsContain(tags: Tag[], text: string): boolean {
    for (const tag in tags) {
        if (tag.toLowerCase().includes(text.toLowerCase())) {
            return true;
        }
    }
    return false;
}