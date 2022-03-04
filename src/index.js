'use strict';

const cheerio = require('cheerio');
const axios = require('axios');

const thesauruses = require('./thesauruses.json');

const filterSynonyms = async (html, selectedDictionary) => {
    try {
        let synonyms = [];

        const $ = cheerio.load(html);

        for (const htmlSection of selectedDictionary.htmlSections) {
            const selectedContent = $(htmlSection);

            for (const content of selectedContent) {
                synonyms = [
                    ...synonyms,
                    ...$(content)
                        .text()
                        .replace(/\s+$/, '')
                        .split(selectedDictionary.splitText),
                ];
            }

            synonyms = synonyms.filter(
                (synonym) => synonym !== '' && !synonym.includes('('),
            );
        }

        return synonyms;
    } catch (error) {
        return error;
    }
};

const thesaurus = async (
    word,
    language = 'en',
    dictionary = 'multi',
) => {
    try {
        const selectedDictionaries = thesauruses.filter(
            (thesaurus) =>
                thesaurus.language === language &&
                (thesaurus.dictionary === dictionary ||
                    dictionary === 'multi'),
        );

        if (selectedDictionaries && selectedDictionaries.length > 0) {
            let results = [];

            for (const selectedDictionary of selectedDictionaries) {
                const response = await axios.get(
                    `${selectedDictionary.url}${word}`,
                );

                if (response.status === 200) {
                    const html = response.data;

                    const synonyms = await filterSynonyms(
                        html,
                        selectedDictionary,
                    );

                    results = [
                        ...results,
                        {
                            word,
                            language,
                            dictionary: selectedDictionary.dictionary,
                            synonyms,
                        },
                    ];
                }
            }

            return results;
        } else {
            throw new Error('No dictionary was found');
        }
    } catch (error) {
        return error;
    }
};

exports.thesaurus = thesaurus;
