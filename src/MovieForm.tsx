import React from 'react';
import { FC, ReactElement } from 'react';
import { useFormik } from 'formik';

const MovieForm: FC = (): ReactElement => {
    const formik = useFormik({
        initialValues: {
            imdbId: '',
            language: 'English',
            title: '',
        },
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 4));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label className="block text-white pt-6" htmlFor="imdbId">IMDb ID</label>
            <input
                type="text"
                id="imdbId"
                name="imdbId"
                onChange={formik.handleChange}
                value={formik.values.imdbId}
            />

            <label className="block text-white pt-6" htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
            />

            <label className="block text-white pt-6" htmlFor="language">Primary language</label>
            <input
                type="text"
                id="language"
                name="language"
                onChange={formik.handleChange}
                value={formik.values.language}
            />

                <button
                    className="block text-white pt-12"
                    type="submit"
                >
                    Submit
                </button>
        </form>
    )
};

export default MovieForm;
