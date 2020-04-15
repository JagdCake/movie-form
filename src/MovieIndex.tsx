import React from 'react';
import { FC, ReactElement } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MOVIE_LIST, Movie } from './graphql/queries';
import QueryState from './QueryState';
import { Link }  from 'react-router-dom';

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
            <li key={index} id={movie.id.toString()} className="py-4 group">
                <h1>
                    <a
                        href={`https://www.imdb.com/title/${movie.imdbId}`}
                        className="text-white text-2xl font-black"
                    >
                        {movie.title}
                        <sup> {movie.yearOfRelease}</sup>
                    </a>
                    <a href={`#${movie.id}`} className="hidden group-hover:inline">
                        <span role="img" aria-label="link icon"> 🔗</span>
                    </a>
                </h1>
                <p className="text-white">
                    {movie.myRating} watched on <time dateTime={movie.watchedOn}>{movie.watchedOn}</time>
                </p>
                <p className="text-white">
                    Here is a <a href={movie.discussion} className="underline">discussion</a> about it.
                </p>
                <Link
                    to={`/movies/${movie.id.toString()}/update`}
                    className="inline-block bg-red my-2 p-2 rounded-lg text-black"
                >
                    Edit
                </Link>
            </li>
        );
    });

    return (
        <article className="text-white text-lg">
            <ul className="list-disc list-outside text-red">
                {movies}
            </ul>
        </article>
    );
};

export default MovieIndex;
