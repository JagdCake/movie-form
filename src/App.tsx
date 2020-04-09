import React from 'react';
import { FC, ReactElement } from 'react';
import MovieForm from './MovieForm';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import MovieIndex from './MovieIndex';

const App: FC = (): ReactElement => {
    return (
        <Router>
            <main className="w-1/4 m-auto">
                <Switch>
                    <Route path="/movies/add">
                        <MovieForm />
                    </Route>
                    <Route path="/movies">
                        <MovieIndex />
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/movies" />
                    </Route>
                </Switch>
            </main>
        </Router>
    );
}

export default App;
