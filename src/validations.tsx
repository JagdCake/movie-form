const imdbIdFormat = (imdbId: string): string => {
    const format = /^tt\d{7,8}$/;
    const error = 'Wrong format: ID must start with `tt` and end with between 7 and 8 numerical characters.';

    if (format.test(imdbId) === false) {
        return error;
    }

    return '';
};
