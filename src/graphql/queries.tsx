import gql from 'graphql-tag';

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
