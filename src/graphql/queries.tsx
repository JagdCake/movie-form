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
