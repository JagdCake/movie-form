import React from 'react';
import { FC, ReactElement } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { MOVIE_LIST, Movie } from './graphql/queries';
import { DELETE_MOVIE } from './graphql/mutations';
import GqlState from './GqlState';
import { Link }  from 'react-router-dom';

const deleteMovie = (
    deleteFunction: Function,
    movieId: number,
    movieTitle: string
): void => {
    const deleteConfirmed = window.confirm(`Delete movie ${movieTitle}?`);

    if (deleteConfirmed) {
        deleteFunction({
            variables: {
                id: movieId
            }
        }).then(() => {
            // refresh page
            window.location.reload(true);
        }).catch((err: Error) => {
            return <GqlState stateMessage={`Error! ${err}`} displayLinkToGoHome={true} />;
        });
    }
};

const MovieIndex: FC = (): ReactElement => {
    const { loading, error, data } = useQuery(MOVIE_LIST);
    const [deleteMovieById] = useMutation(DELETE_MOVIE);

    if (loading) {
        return <GqlState stateMessage="Loading movie list." />;
    }
    if (error) {
        return <GqlState stateMessage={`Error! ${error.message}`} />;
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
                    <span className="text-red">{movie.myRating}</span>
                    <span> ({movie.imdbRating} on IMDb) watched on </span>
                    <time dateTime={movie.watchedOn} className="text-red">{movie.watchedOn}</time>
                    <span>.</span>
                </p>
                <p className="text-white">
                    <span>It's in </span>
                    <span className="text-red">{movie.language}</span>
                    <span>, and the genre is </span>
                    <span className="text-red">{movie.genre}</span>.
                </p>
                <p className="text-white">
                    <span>Directed by </span>
                    <span className="text-red">{movie.directors.join(', ')}</span>
                    <span>.</span>
                </p>
                <p className="text-white">
                    <span>Starring </span>
                    <span className="text-red">{movie.topActors.join(' and ')}</span>
                    <span>.</span>
                </p>
                <p className="text-white">
                    <span>Here is a </span>
                    <a href={movie.discussion} className="underline">discussion</a>
                    <span> about it.</span>
                </p>
                <div className="w-1/2 flex justify-between">
                    {movie.id === movieList.length && (
                        <button
                            onClick={() => deleteMovie(deleteMovieById, movie.id, movie.title)}
                            className="inline-block bg-red my-2 p-2 rounded-lg text-black"
                        >
                            Delete
                        </button>
                    )}
                    <Link
                        to={`/movies/${movie.id.toString()}/update`}
                        className="inline-block bg-yellow-500 my-2 p-2 rounded-lg text-black"
                    >
                        Edit
                    </Link>
                </div>
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
