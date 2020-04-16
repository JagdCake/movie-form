import React from 'react';
import { FC, ReactElement } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import MovieForm from './MovieForm';
import { MOVIE_BY_ID } from './graphql/queries';
import GqlState from './GqlState';
import { UPDATE_MOVIE } from './graphql/mutations';
import validate from './validations';
import { useState, useEffect } from 'react';

interface UpdateFormProp {
    idOfMovieToUpdate: number;
};

const UpdateForm: FC<UpdateFormProp> = ({
    idOfMovieToUpdate,
}: UpdateFormProp): ReactElement => {
    const [updateMovie] = useMutation(UPDATE_MOVIE);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        // prevents warning that React can't perform a state update on
        // unmounted component
        // Source: https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component/60907638#60907638
        let isMounted = true;

        if (isMounted && formSubmitted) {
            // link to the updated movie in the movie list, in the same
            // tab; the problem is that you have to manually activate
            // the URL to actually scroll to the movie
            window.open(`/movies#${idOfMovieToUpdate}`, '_self');
        }

        return () => {
            // effect cleanup
            isMounted = false;
        };
    });

    const { loading, error, data } = useQuery(MOVIE_BY_ID, {
        variables: { movieId: idOfMovieToUpdate }
    });

    if (loading) {
        return <GqlState stateMessage="Loading movie data." />;
    }
    if (error) {
        return <GqlState stateMessage={`Error! ${error.message}`} displayLinkToGoHome={true} />;
    }
    if (data.movieById === null) {
        return (
            <GqlState
                stateMessage={`Error! No data found for movie with ID ${idOfMovieToUpdate}.`}
                displayLinkToGoHome={true}
            />
        );
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
                }).then(() => {
                    actions.setSubmitting(false);
                    setTimeout(() => {
                        setFormSubmitted(true);
                    }, 500);
                }).catch((err) => {
                    return <GqlState stateMessage={`Error! ${err}`} displayLinkToGoHome={true} />;
                });
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
