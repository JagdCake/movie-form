import React from 'react';
import { FC, ReactElement } from 'react';

interface QueryStateProps {
    stateMessage: string;
};

const QueryState: FC<QueryStateProps> = ({
    stateMessage,
}: QueryStateProps): ReactElement => (
    <article className="h-screen text-white text-2xl py-64 text-center">
        {stateMessage}
    </article>
);

export default QueryState;
