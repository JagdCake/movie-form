import React from 'react';
import { FC, ReactElement } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MOVIE_LIST, Movie } from './graphql/queries';
import QueryState from './QueryState';

const MovieIndex: FC = (): ReactElement => {
    const { loading, error, data } = useQuery(MOVIE_LIST);

    if (loading) {
        return <QueryState stateMessage="Loading movie list." />;
    }
    if (error) {
        return <QueryState stateMessage={`Error! ${error.message}`} />;
    }

    const movieList: Movie[] = data.allMovies.nodes;

    const movies: ReactElement[] = movieList.map((movie: Movie, index: number) => {
        return (
            <li key={index}>
                <span>#{movie.id}</span>
            </li>
        );
    });

    return (
        <article className="text-white">
            <ul>
                {movies}
            </ul>
        </article>
    );
};

export default MovieIndex;
