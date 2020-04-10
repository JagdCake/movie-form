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
            <li key={index} id={movie.id.toString()} className="py-4">
                <a
                    href={`https://www.imdb.com/title/${movie.imdbId}`}
                    className="text-white text-2xl font-black"
                >
                    {movie.title}
                    <sup> {movie.yearOfRelease}</sup>
                </a>
                <a href={`#${movie.id}`}>
                    <span role="img" aria-label="link icon"> 🔗</span>
                </a>
            </li>
        );
    });

    return (
        <article className="text-white text-lg">
            <ul className="list-disc list-outside text-red-500">
                {movies}
            </ul>
        </article>
    );
};

export default MovieIndex;
