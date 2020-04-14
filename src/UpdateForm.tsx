import React from 'react';
import { FC, ReactElement } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MOVIE_BY_ID } from './graphql/queries';
import QueryState from './QueryState';

interface UpdateFormProp {
    idOfMovieToUpdate: number;
};

const UpdateForm: FC<UpdateFormProp> = ({
    idOfMovieToUpdate,
}: UpdateFormProp): ReactElement => {
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
        <>I'm an update form.</>
    );
};

export default UpdateForm;
