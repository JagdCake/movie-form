import gql from 'graphql-tag';

export interface Movie {
    id: number;
    title: string;
    yearOfRelease: number;
    imdbId: string;
    myRating: string;
    watchedOn: string;
};

export const MOVIE_LIST = gql`
    query MovieList {
        allMovies(orderBy: ID_DESC) {
            nodes {
                id
                title
                yearOfRelease
                imdbId
                myRating
                watchedOn
            }
        }
    }
`;

export const MOVIE_BY_ID = gql`
    query MovieById($movieId: Int!) {
        movieById(id: $movieId) {
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
`;
