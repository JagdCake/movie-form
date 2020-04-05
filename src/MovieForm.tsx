import React from 'react';
import { FC, ReactElement } from 'react';
import { useFormik } from 'formik';

const MovieForm: FC = (): ReactElement => {
    const formik = useFormik({
        initialValues: {
            imdbId: '',
            language: 'English',
            title: '',
            yearOfRelease: new Date().getFullYear() - 1,
            runtime: 116,
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

            <label className="block text-white pt-6" htmlFor="yearOfRelease">Year</label>
            <input
                type="number"
                id="yearOfRelease"
                name="yearOfRelease"
                onChange={formik.handleChange}
                value={formik.values.yearOfRelease}
            />

            <label className="block text-white pt-6" htmlFor="runtime">Runtime (minutes)</label>
            <input
                type="number"
                id="runtime"
                name="runtime"
                onChange={formik.handleChange}
                value={formik.values.runtime}
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
