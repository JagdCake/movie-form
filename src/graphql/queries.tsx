import gql from 'graphql-tag';

export interface Movie {
    id: number;
    title: string;
    yearOfRelease: number;
    imdbId: string;
    myRating: string;
    watchedOn: string;
    discussion: string;
    imdbRating: number;
    directors: string[];
    topActors: [string, string];
    language: string;
    genre: string;
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
                discussion
                imdbRating
                directors
                topActors
                language
                genre
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
