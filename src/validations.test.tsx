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
});
