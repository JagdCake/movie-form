import React from 'react';
import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface GqlStateProps {
    stateMessage: string;
    displayLinkToGoHome?: boolean;
};

const GqlState: FC<GqlStateProps> = ({
    stateMessage,
    displayLinkToGoHome = false
}: GqlStateProps): ReactElement => (
    <article className="h-screen text-white text-2xl py-64 text-center">
        <h1>{stateMessage}</h1>
        {displayLinkToGoHome === true && (
            <Link to="/movies">&larr; Go to movie list.</Link>
        )}
    </article>
);

export default GqlState;
