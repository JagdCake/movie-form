import React from 'react';
import { FC, ReactElement } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { ADD_MOVIE } from './graphql/mutations';
import validate from './validations';

interface ErrorMessageProps {
    message: string | undefined;
    display: boolean | '' | undefined;
}

const ErrorMessage: FC<ErrorMessageProps> = ({
    message = '',
    display = false,
}: ErrorMessageProps): ReactElement | null => {
    if (display) {
        return (
            <p className="w-48 text-red-500 p-4">{message}</p>
        );
    }

    return null;
}

export interface MovieFormProps {
    imdbId: string;
    language: string;
    title: string;
    yearOfRelease: number;
    runtime: number;
    genre: string;
    imdbRating: number;
    directors: string;
    topActors: string;
    myRating: string;
    watchedOn: string;
    discussion: string;
};

const MovieForm: FC = (): ReactElement => {
    const [addMovie] = useMutation(ADD_MOVIE);

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
                    watchedOn: '',
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
                });
                actions.setSubmitting(false);
            }}
            validate={validate}
        >
            {(
                {
                    values,
                    handleSubmit,
                    handleChange,
                    errors,
                    touched
                }
            ) => (
                <form onSubmit={handleSubmit} className="w-1/2 m-auto">
                    <label className="block text-white pt-6" htmlFor="imdbId">IMDb ID</label>
                    <input
                        type="text"
                        id="imdbId"
                        name="imdbId"
                        onChange={handleChange}
                        value={values.imdbId}
                        required={true}
                    />
                    <ErrorMessage message={errors.imdbId} display={errors.imdbId && touched.imdbId} />

                    <label className="block text-white pt-6" htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={handleChange}
                        value={values.title}
                        required={true}
                    />

                    <label className="block text-white pt-6" htmlFor="language">Primary language</label>
                    <input
                        type="text"
                        id="language"
                        name="language"
                        onChange={handleChange}
                        value={values.language}
                        required={true}
                    />

                    <label className="block text-white pt-6" htmlFor="yearOfRelease">Year</label>
                    <input
                        type="number"
                        id="yearOfRelease"
                        name="yearOfRelease"
                        onChange={handleChange}
                        value={values.yearOfRelease}
                        required={true}
                    />

                    <label className="block text-white pt-6" htmlFor="runtime">Runtime (minutes)</label>
                    <input
                        type="number"
                        id="runtime"
                        name="runtime"
                        onChange={handleChange}
                        value={values.runtime}
                        required={true}
                    />

                    <label className="block text-white pt-6" htmlFor="genre">Primary genre</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        list="genres"
                        onChange={handleChange}
                        value={values.genre}
                        required={true}
                    />
                    <datalist id="genres">
                        <option value="Drama" />
                        <option value="Horror" />
                        <option value="Action" />
                        <option value="Thriller" />
                        <option value="Comedy" />
                        <option value="Crime" />
                        <option value="Mystery" />
                        <option value="Adventure" />
                        <option value="Fantasy" />
                        <option value="Biography" />
                        <option value="Sci-Fi" />
                        <option value="Romance" />
                        <option value="War" />
                        <option value="Musical" />
                        <option value="Animation" />
                        <option value="Family" />
                        <option value="Western" />
                    </datalist>

                    <label className="block text-white pt-6" htmlFor="imdbRating">IMDb rating</label>
                    <input
                        type="number"
                        id="imdbRating"
                        name="imdbRating"
                        step="0.1"
                        min="0.0"
                        max="10.0"
                        onChange={handleChange}
                        value={values.imdbRating}
                        required={true}
                    />

                    <fieldset className="border border-white p-2 mt-6">
                        <legend className="text-white p-2">
                            <span>Names of directors(s) and actors.</span>
                            <strong className="block text-sm">(separate the names with commas)</strong>
                        </legend>

                        <label className="text-white" htmlFor="directors">Director(s) (max. 3)</label>
                        <input
                            type="text"
                            id="directors"
                            name="directors"
                            onChange={handleChange}
                            value={values.directors}
                            required={true}
                        />
                        <ErrorMessage message={errors.directors} display={errors.directors && touched.directors} />

                        <label className="block text-white pt-6" htmlFor="topActors">Top two actors</label>
                        <input
                            type="text"
                            id="topActors"
                            name="topActors"
                            onChange={handleChange}
                            value={values.topActors}
                            required={true}
                        />
                        <ErrorMessage message={errors.topActors} display={errors.topActors && touched.topActors} />
                    </fieldset>

                    <label className="block text-white pt-6" htmlFor="myRating">My rating</label>
                    <select
                        id="myRating"
                        name="myRating"
                        onChange={handleChange}
                        value={values.myRating}
                        required={true}
                    >
                        <option value="Bad Eggplant">Bad Eggplant</option>
                        <option value="Decent Carrot">Decent Carrot</option>
                        <option value="Good Tomato">Good Tomato</option>
                        <option value="Great Onion">Great Onion</option>
                        <option value="Amazing Savory">Amazing Savory</option>
                        <option value="Sublime Lettuce">Sublime Lettuce</option>
                    </select>

                    <label className="block text-white pt-6" htmlFor="watchedOn">Watched on (date)</label>
                    <input
                        type="text"
                        id="watchedOn"
                        name="watchedOn"
                        onChange={handleChange}
                        value={values.watchedOn}
                        required={true}
                    />

                    <label className="block text-white pt-6" htmlFor="discussion">Link to discussion / reviews</label>
                    <input
                        type="text"
                        id="discussion"
                        name="discussion"
                        onChange={handleChange}
                        value={values.discussion}
                        required={true}
                    />

                    <button
                        className="block text-white pt-12"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    );
};

export default MovieForm;
