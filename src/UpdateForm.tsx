import React from 'react';
import { FC, ReactElement } from 'react';

interface UpdateFormProp {
    idOfMovieToUpdate: number;
};

const UpdateForm: FC<UpdateFormProp> = ({
    idOfMovieToUpdate,
}: UpdateFormProp): ReactElement => {


    return (
        <>I'm an update form.</>
    );
};

export default UpdateForm;
