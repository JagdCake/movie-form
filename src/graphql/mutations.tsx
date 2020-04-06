import gql from 'graphql-tag';

export const ADD_MOVIE = gql`
    mutation CreateMovie($input: CreateMovieInput!) {
        createMovie(input: $input) {
            clientMutationId
            movie {
                imdbId
                language
                title
                yearOfRelease
                runtime
                genre
                imdbRating
                directors
                topActors
                myRating
                watchedOn
                discussion
            }
        }
    }
`;
