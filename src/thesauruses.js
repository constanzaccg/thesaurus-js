export const thesauruses = [
    {
        language: 'es',
        dictionary: 'wordreference',
        url: 'https://www.wordreference.com/sinonimos/',
        htmlSections: ['#otherDicts div:first-of-type li'],
        splitText: ',  ',
    },
    {
        language: 'en',
        dictionary: 'wordreference',
        url: 'https://www.wordreference.com/synonyms/',
        htmlSections: ['#otherDicts .engthes span'],
    },
    {
        language: 'en',
        dictionary: 'thesaurus',
        url: 'https://www.thesaurus.com/browse/',
        htmlSections: ['#meanings li'],
    },
    {
        language: 'es',
        dictionary: 'reverso',
        url: 'https://prs-ccg.ew.r.appspot.com/https://synonyms.reverso.net/sinonimo/es/',
        htmlSections: [
            'div.word-opt li a',
            'div.extended-suggestions a',
        ],
    },
    {
        language: 'en',
        dictionary: 'reverso',
        url: 'https://prs-ccg.ew.r.appspot.com/https://synonyms.reverso.net/sinonimo/en/',
        htmlSections: [
            'div.word-opt li a',
            'div.extended-suggestions a',
        ],
    },
    {
        language: 'fr',
        dictionary: 'reverso',
        url: 'https://prs-ccg.ew.r.appspot.com/https://synonyms.reverso.net/sinonimo/fr/',
        htmlSections: [
            'div.word-opt li a',
            'div.extended-suggestions a',
        ],
    },
    {
        language: 'pt',
        dictionary: 'reverso',
        url: 'https://prs-ccg.ew.r.appspot.com/https://synonyms.reverso.net/sinonimo/pt/',
        htmlSections: [
            'div.word-opt li a',
            'div.extended-suggestions a',
        ],
    },
    {
        language: 'it',
        dictionary: 'reverso',
        url: 'https://prs-ccg.ew.r.appspot.com/https://synonyms.reverso.net/sinonimo/it/',
        htmlSections: [
            'div.word-opt li a',
            'div.extended-suggestions a',
        ],
    },
    {
        language: 'de',
        dictionary: 'reverso',
        url: 'https://prs-ccg.ew.r.appspot.com/https://synonyms.reverso.net/sinonimo/de/',
        htmlSections: [
            'div.word-opt li a',
            'div.extended-suggestions a',
        ],
    },
];
