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
            {(props) => (
                <form onSubmit={props.handleSubmit} className="w-1/2 m-auto">
                    <label className="block text-white pt-6" htmlFor="imdbId">IMDb ID</label>
                    <input
                        type="text"
                        id="imdbId"
                        name="imdbId"
                        onChange={props.handleChange}
                        value={props.values.imdbId}
                        required={true}
                    />

                    <label className="block text-white pt-6" htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={props.handleChange}
                        value={props.values.title}
                        required={true}
                    />

                    <label className="block text-white pt-6" htmlFor="language">Primary language</label>
                    <input
                        type="text"
                        id="language"
                        name="language"
                        onChange={props.handleChange}
                        value={props.values.language}
                        required={true}
                    />

                    <label className="block text-white pt-6" htmlFor="yearOfRelease">Year</label>
                    <input
                        type="number"
                        id="yearOfRelease"
                        name="yearOfRelease"
                        onChange={props.handleChange}
                        value={props.values.yearOfRelease}
                        required={true}
                    />

                    <label className="block text-white pt-6" htmlFor="runtime">Runtime (minutes)</label>
                    <input
                        type="number"
                        id="runtime"
                        name="runtime"
                        onChange={props.handleChange}
                        value={props.values.runtime}
                        required={true}
                    />

                    <label className="block text-white pt-6" htmlFor="genre">Primary genre</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        list="genres"
                        onChange={props.handleChange}
                        value={props.values.genre}
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
                        onChange={props.handleChange}
                        value={props.values.imdbRating}
                        required={true}
                    />

                    <label className="block text-white pt-6" htmlFor="directors">Director(s) (max. 3)</label>
                    <input
                        type="text"
                        id="directors"
                        name="directors"
                        onChange={props.handleChange}
                        value={props.values.directors}
                        required={true}
                    />

                    <label className="block text-white pt-6" htmlFor="topActors">Top two actors</label>
                    <input
                        type="text"
                        id="topActors"
                        name="topActors"
                        onChange={props.handleChange}
                        value={props.values.topActors}
                        required={true}
                    />

                    <label className="block text-white pt-6" htmlFor="myRating">My rating</label>
                    <select
                        id="myRating"
                        name="myRating"
                        onChange={props.handleChange}
                        value={props.values.myRating}
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
                        onChange={props.handleChange}
                        value={props.values.watchedOn}
                        required={true}
                    />

                    <label className="block text-white pt-6" htmlFor="discussion">Link to discussion / reviews</label>
                    <input
                        type="text"
                        id="discussion"
                        name="discussion"
                        onChange={props.handleChange}
                        value={props.values.discussion}
                        required={true}
                    />

                    <button
                        className="block text-white pt-12"
                        type="submit"
                        onClick={() => props.setSubmitting(true)}
                    >
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    );
};

export default MovieForm;
