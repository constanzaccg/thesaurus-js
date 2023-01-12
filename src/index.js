'use strict';

import cheerio from 'cheerio';
import axios from 'axios';

import { thesauruses } from './thesauruses.js';

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

export const thesaurus = async (
    word,
    language = 'en',
    dictionaries = ['multi'],
) => {
    try {
        const selectedDictionaries = thesauruses.filter(
            (thesaurus) =>
                thesaurus.language === language &&
                (dictionaries.includes(thesaurus.dictionary) ||
                    dictionaries.includes('multi')),
        );

        if (selectedDictionaries && selectedDictionaries.length > 0) {
            let results = [];

            for (const selectedDictionary of selectedDictionaries) {
                const response = await axios.get(
                    `${selectedDictionary.url}${word}`,
                    {
                        validateStatus: () => {
                            return true;
                        },
                    },
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
        return null;
    }
};
