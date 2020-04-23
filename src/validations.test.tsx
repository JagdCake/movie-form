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
    });
});
