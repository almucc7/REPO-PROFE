import { countWords, generatePassword } from './tools.js';

//
// console.log('Words', countWords(sentence));

// console.log(generatePassword(13));

describe('countWords tests', () => {
    test('it should be 1 when sentence is a word', () => {
        const sentence = 'Hola';
        const expected = 1;
        expect(countWords(sentence)).toBe(expected);
    });
    test('it should be 3 when sentence is three words', () => {
        const sentence = 'Hola mundo cruel';
        const expected = 3;
        expect(countWords(sentence)).toBe(expected);
    });
    test('it should be 0 when sentence is empty', () => {
        const sentence = '';
        const expected = 0;
        expect(countWords(sentence)).toBe(expected);
    });
    test('it should be 3 when sentence is three words with multiple spaces', () => {
        const sentence = 'Hola    mundo      cruel';
        const expected = 3;
        expect(countWords(sentence)).toBe(expected);
    });

    // test('it should be 0 when sentence is not a string', () => {
    //     expect(countWords(0)).toBeUndefined();
    // });
});

describe('generatePassword tests', () => {
    test('it should be a string', () => {
        const length = 13;
        const result = generatePassword(length);
        expect(result).toBeTypeOf('string');
    });
    test('it should have 6 as minimum length', () => {
        const length = 1;
        const result = generatePassword(length);
        expect(result).toHaveLength(6);
    });
    test('it should have de length', () => {
        const length = 13;
        const result = generatePassword(length);
        expect(result).toHaveLength(length);
    });
    test('it should have a large length', () => {
        const length = 130;
        const result = generatePassword(length);
        expect(result).toHaveLength(length);
    });
    test('it should have three kind of symbols', () => {
        const length = 13;
        const result = generatePassword(length);
        expect(result).toMatch(/[A-Z]/);
        expect(result).toMatch(/[a-z]/);
        expect(result).toMatch(/[0-9]/);
    });
});
