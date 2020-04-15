import React from 'react';
import { FC, ReactElement } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import MovieForm from './MovieForm';
import { MOVIE_BY_ID } from './graphql/queries';
import QueryState from './QueryState';
import { UPDATE_MOVIE } from './graphql/mutations';
import validate from './validations';

interface UpdateFormProp {
    idOfMovieToUpdate: number;
};

const UpdateForm: FC<UpdateFormProp> = ({
    idOfMovieToUpdate,
}: UpdateFormProp): ReactElement => {
    const [updateMovie] = useMutation(UPDATE_MOVIE);

    const { loading, error, data } = useQuery(MOVIE_BY_ID, {
        variables: { movieId: idOfMovieToUpdate }
    });

    if (loading) {
        return <QueryState stateMessage="Loading movie data." />;
    }
    if (error) {
        return <QueryState stateMessage={`Error! ${error.message}`} />;
    }
    if (data.movieById === null) {
        return <QueryState stateMessage={`Error! No data found for movie with ID ${idOfMovieToUpdate}.`} />;
    }
    const movieToUpdate = data.movieById;

    return (
        <Formik
            initialValues={
                {
                    imdbId: movieToUpdate.imdbId,
                    language: movieToUpdate.language,
                    title: movieToUpdate.title,
                    yearOfRelease: movieToUpdate.yearOfRelease,
                    runtime: movieToUpdate.runtime,
                    genre: movieToUpdate.genre,
                    imdbRating: movieToUpdate.imdbRating,
                    directors: movieToUpdate.directors.toString(),
                    topActors: movieToUpdate.topActors.toString(),
                    myRating: movieToUpdate.myRating,
                    watchedOn: movieToUpdate.watchedOn,
                    discussion: movieToUpdate.discussion,
                }
            }
            onSubmit={(values, actions) => {
                updateMovie({
                    variables: {
                        id: idOfMovieToUpdate,
                        moviePatch: {
                            imdbId: values.imdbId,
                            language: values.language,
                            title: values.title,
                            yearOfRelease: values.yearOfRelease,
                            runtime: values.runtime,
                            genre: values.genre,
                            imdbRating: values.imdbRating,
                            directors: values.directors.split(','),
                            topActors: values.topActors.split(','),
                            myRating: values.myRating,
                            watchedOn: values.watchedOn,
                            discussion: values.discussion,
                        }
                    }
                });
                actions.setSubmitting(false);
            }}
            validate={validate}
        >
                {(props) => (
                    <MovieForm {...props} />
            )}
        </Formik>
    );
};

export default UpdateForm;
