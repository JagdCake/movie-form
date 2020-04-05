import React from 'react';
import { FC, ReactElement } from 'react';
import { useFormik } from 'formik';

const MovieForm: FC = (): ReactElement => {
    const formik = useFormik({
        initialValues: {
            imdbId: '',
            language: 'English',
        },
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 4));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label className="block" htmlFor="imdbId">IMDb ID</label>
            <input
                type="text"
                id="imdbId"
                name="imdbId"
                onChange={formik.handleChange}
                value={formik.values.imdbId}
            />

            <label className="block" htmlFor="language">Primary language</label>
            <input
                type="text"
                id="language"
                name="language"
                onChange={formik.handleChange}
                value={formik.values.language}
            />

            <button className="block" type="submit">Submit</button>
        </form>
    )
};

export default MovieForm;
