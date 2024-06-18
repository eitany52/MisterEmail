
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    makeLorem,
    getRandomIntInclusive
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function makeLorem(size = 100) {
    var words = [
        'sky',
        'above',
        'port',
        'was',
        'television',
        'tuned',
        'to',
        'channel',
        'all',
        'baby',
        'thing',
        'happened',
        'less',
        'I',
        'had',
        'story',
        'bit',
        'people',
        'and',
        'generally',
        'happens',
        'cases',
        'time',
        'it',
        'was',
        'story',
        'It',
        'was',
        'pleasure',
        'to',
        'burn',
    ]
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt.slice(0, -1)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}