import React from 'react';
import { FC, ReactElement } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import MovieForm from './MovieForm';
import { MOVIE_BY_ID } from './graphql/queries';
import QueryState from './QueryState';
import { UPDATE_MOVIE } from './graphql/mutations';

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
                    directors: movieToUpdate.directors,
                    topActors: movieToUpdate.topActors,
                    myRating: movieToUpdate.myRating,
                    watchedOn: movieToUpdate.watchedOn,
                    discussion: movieToUpdate.discussion,
                }
            }
            onSubmit={(values, actions) => {
                console.table(values);
                actions.setSubmitting(false);
            }}
        >
                {(props) => (
                    <MovieForm {...props} />
            )}
        </Formik>
    );
};

export default UpdateForm;
