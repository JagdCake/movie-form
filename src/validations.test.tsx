import validate from './validations';
import { MovieFormValues } from './MovieForm';

const validFormValues: MovieFormValues = {
    imdbId: 'tt0000000',
    directors: 'Director Name 1,Director Name 2',
    topActors: 'Actor Name 1,Actor Name 2',
} as MovieFormValues;

describe('Validation function', () => {
    it('should make sure there are no errors when values are correct', () => {
        const noValidationErrors = validate(validFormValues);
        expect(noValidationErrors).toEqual({});
    });

    describe('should return error messsage if', () => {
        it('IMDb ID has more than 8 digits', () => {
            const tooLongID = validFormValues;
            tooLongID.imdbId = 'tt000000000';

            const validationErrors = validate(tooLongID);
            expect(validationErrors.imdbId).toBeTruthy();
        });

        it('IMDb ID has less than 7 digits', () => {
            const tooShortID = validFormValues;
            tooShortID.imdbId = 'tt000000';

            const validationErrors = validate(tooShortID);
            expect(validationErrors.imdbId).toBeTruthy();
        });

        it(`IMDb ID doesn't start with "tt"`, () => {
            const incorrectStartCharacters = validFormValues;
            incorrectStartCharacters.imdbId = 'rr0000000';
            expect(validate(incorrectStartCharacters).imdbId).toBeTruthy();
        });

        it(`directors/actors value starts/ends with comma/space`, () => {
            const incorrectStartCharacter = validFormValues;
            incorrectStartCharacter.directors = ',Name Name';
            expect(validate(incorrectStartCharacter).directors).toBeTruthy();

            const incorrectEndCharacter = validFormValues;
            incorrectEndCharacter.topActors = 'Name Name ';
            expect(validate(incorrectEndCharacter).topActors).toBeTruthy();
        });

        it(`directors/actors value contains 2 or more commas/spaces in a row`, () => {
            const twoCommas = validFormValues;
            twoCommas.directors = 'Name,,Name 2';
            expect(validate(twoCommas).directors).toBeTruthy();

            const twoSpaces = validFormValues;
            twoSpaces.directors = 'Name  Name';
            expect(validate(twoSpaces).directors).toBeTruthy();
        });

        it(`directors value contains more than 3 comma-separated names`, () => {
            const tooManyNames = validFormValues;
            tooManyNames.directors = 'Name,Name 2,Name 3,Name 4';
            expect(validate(tooManyNames).directors).toBeTruthy();
        });

        it(`actors value contains more than 2 comma-separated names`, () => {
            const tooManyNames = validFormValues;
            tooManyNames.topActors = 'Name,Name 2,Name 3';
            expect(validate(tooManyNames).topActors).toBeTruthy();
        });

        it(`actors value contains fewer than 2 comma-separated names`, () => {
            const tooManyNames = validFormValues;
            tooManyNames.topActors = 'Name';
            expect(validate(tooManyNames).topActors).toBeTruthy();
        });
    });
});
