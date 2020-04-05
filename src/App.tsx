import React from 'react';
import { FC, ReactElement } from 'react';
import MovieForm from './MovieForm';

const App: FC = (): ReactElement => {
    return (
        <main>
            <MovieForm />
        </main>
    );
}

export default App;
