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

export const UPDATE_MOVIE = gql`
    mutation UpdateMovieById($id: Int!, $moviePatch: MoviePatch!) {
        updateMovieById(input: {id: $id, moviePatch: $moviePatch}) {
            clientMutationId
         }
    }
`;

export const DELETE_MOVIE = gql`
    mutation DeleteMovieById($id: Int!) {
        deleteMovieById(input: {id: $id}) {
            deletedMovieId
        }
    }
`;
