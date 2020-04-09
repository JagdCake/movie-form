import React from 'react';
import { FC, ReactElement } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import MovieIndex from './MovieIndex';

const App: FC = (): ReactElement => {
    return (
        <Router>
            <main className="w-1/4 m-auto">
                <Switch>
                    <Route path="/movies">
                        <MovieIndex />
                    </Route>
                </Switch>
            </main>
        </Router>
    );
}

export default App;
