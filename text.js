const stringSimilarity = require('string-similarity-js');

function getTextDifferences(originalText, newText) {
    const originalWords = originalText.split(' ');
    const newWords = newText.split(' ');

    const differences = [];
    let i = 0;
    let j = 0;

    while (i < originalWords.length || j < newWords.length) {
        if (i >= originalWords.length) {
            // If there are remaining words in newText, they are added
            differences.push({
                kind: "ADD",
                index: j,
                text: newWords.slice(j).join(' ')
            });
            break;
        } else if (j >= newWords.length) {
            // If there are remaining words in originalText, they are removed
            differences.push({
                kind: "REMOVE",
                index: i,
                text: originalWords.slice(i).join(' ')
            });
            break;
        } else if (originalWords[i] !== newWords[j]) {
            // If the words differ, mark as CHANGE if both words exist, otherwise ADD or REMOVE
            if (originalWords[i] && newWords[j]) {
                differences.push({
                    kind: "CHANGE",
                    index: i,
                    old: originalWords[i],
                    new: newWords[j]
                });
                i++;
                j++;
            } else if (!originalWords[i]) {
                differences.push({
                    kind: "ADD",
                    index: j,
                    text: newWords[j]
                });
                j++;
            } else if (!newWords[j]) {
                differences.push({
                    kind: "REMOVE",
                    index: i,
                    text: originalWords[i]
                });
                i++;
            }
        } else {
            // If words match, continue to the next word
            i++;
            j++;
        }
    }

    return differences;
}

module.exports = getTextDifferences;