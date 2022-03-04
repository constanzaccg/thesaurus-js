'use strict';

import cheerio from 'cheerio';
import ky from 'ky';

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
                const response = await ky.get(
                    `${selectedDictionary.url}${word}`,
                );

                if (response.status === 200) {
                    const { value } = await response.body
                        .getReader()
                        .read();
                    const html = new TextDecoder('utf-8').decode(
                        value,
                    );

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
