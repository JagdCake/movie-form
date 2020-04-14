import { MovieFormValues } from './MovieForm';

const imdbIdFormat = (imdbId: string): string => {
    const format = /^tt\d{7,8}$/;
    const error = 'Wrong format: ID must start with `tt` and end with between 7 and 8 numerical characters.';

    if (format.test(imdbId) === false) {
        return error;
    }

    return '';
};

const maxThreeDirectors = (directors: string): string => {
    // not good, but will have to do for now
    const commas = /,/g;
    const error = 'Too many names: You can enter 3 at most.';

    const numberOfCommas = (directors.match(commas) || []).length;
    if (numberOfCommas >= 3) {
        return error;
    }

    return '';
};

const maxTwoActors = (actors: string): string => {
    const commas = /,/g;
    const errorTooFew = 'Too few names: You must enter 2 names.';
    const errorTooMany = 'Too many names: You can enter two at most.';

    const numberOfCommas = (actors.match(commas) || []).length;

    switch (numberOfCommas) {
        case 0:
            return errorTooFew;
        case 1:
            return '';
        default:
            return errorTooMany;
    };
};


const validate = (values: MovieFormValues) => {
    const errors: any = {};

    errors.imdbId = imdbIdFormat(values.imdbId);
    errors.directors = maxThreeDirectors(values.directors);
    errors.topActors = maxTwoActors(values.topActors);

    // without this check the form data can't be submitted; the
    // validation functions always return a value, even if there is no
    // error (''), so the error object is never empty which makes Formik
    // think there are errors and the submission handler doesn't get
    // called
    const noErrors = Object.values(errors).every((error) => error === '');
    if (noErrors) {
        return {};
    }

    return errors;
};

export default validate;
