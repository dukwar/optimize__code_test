// function for searching indexes
function getIndex(str) {
    const nonLetters = [' ', ',', '.', ':', '-', ';', '\'']
    let stringIndex = 0
    let letterIndex = 0.5

    for (let i = 0; i < str.length; i++) {
        if (!nonLetters.includes(str[i])) {
            stringIndex += letterIndex
            letterIndex += 1
        }
    }
    return stringIndex
}

// count the number of index in the Ru text
function getRusIndex(rusText) {
    return rusText.map(item => getIndex(item))
}

// count the index of the En text
function getEnIndex(enTextWithComments) {
    return enTextWithComments.map(item => getIndex(item.split('|')[0]) + getIndex(item.split('|')[1]))
}

// create a match object
function getMatchIndexes(ruIndex, enIndex, ruText, enText) {
    return ruIndex.reduce((acc, ruIndex, indexRu) => {
        enIndex.forEach((enIndex, indexEn) => {
            ruIndex === enIndex && acc.push({ruText: ruText[indexRu], enText: enText[indexEn]})
        })
        return acc
    }, [])
}

// the starting point of the program, where we search for all indexes, and also launch the function of creating a match object
function compare(ruText, enText) {
    const ruIndex = getRusIndex(ruText)
    const enIndex = getEnIndex(enText)
    return getMatchIndexes(ruIndex, enIndex, ruText, enText)
}

// data test
const ruText = ['Я', 'люблю', 'свою', 'маму', 'и', 'собаку']
const enTextWithComments = ['I | !', 'love | ,', 'dogs | :', 'and | ;', 'cats | .']

console.log(compare(ruText, enTextWithComments))


