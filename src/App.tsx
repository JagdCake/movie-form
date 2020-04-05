import React from 'react';
import { FC, ReactElement } from 'react';
import MovieForm from './MovieForm';

const App: FC = (): ReactElement => {
    return (
        <main className="w-1/4 m-auto">
            <MovieForm />
        </main>
    );
}

export default App;
