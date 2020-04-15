import React from 'react';
import { FC, ReactElement } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { ADD_MOVIE } from './graphql/mutations';
import validate from './validations';
import { useState, useEffect } from 'react';
import MovieForm from './MovieForm';

const AddForm: FC = (): ReactElement => {
    const [addMovie] = useMutation(ADD_MOVIE);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        // prevents warning that React can't perform a state update on
        // unmounted component
        // Source: https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component/60907638#60907638
        let isMounted = true;

        if (isMounted && formSubmitted) {
            // open the movie list in the same tab
            window.open('/movies', '_self');
        }

        return () => {
            // effect cleanup
            isMounted = false;
        };
    });

    return (
        <Formik
            initialValues={
                {
                    imdbId: '',
                    language: 'English',
                    title: '',
                    yearOfRelease: new Date().getFullYear() - 1,
                    runtime: 116,
                    genre: 'Drama',
                    imdbRating: 6.0,
                    directors: '',
                    topActors: '',
                    myRating: 'Great Onion',
                    watchedOn: new Date().toISOString().split('T')[0],
                    discussion: '',
                }
            }
            onSubmit={(values, actions) => {
                addMovie({
                    variables: {
                        input: {
                            clientMutationId: `newMovie${values.imdbId}`,
                            movie: {
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
                    }
                }).then(() => {
                    actions.setSubmitting(false);
                    setTimeout(() => {
                        setFormSubmitted(true);
                    }, 500);
                }).catch((err) => {
                    console.error(err);
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

export default AddForm;
