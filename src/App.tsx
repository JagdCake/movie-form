import React from 'react';
import { FC, ReactElement } from 'react';
import AddForm from './AddForm';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import MovieIndex from './MovieIndex';
import Header from './Header';

const App: FC = (): ReactElement => {
    return (
        <Router>
            <main className="w-1/4 m-auto">
                <Switch>
                    <Route path="/movies/add">
                        <AddForm />
                    </Route>
                    <Route path="/movies">
                        <Header />
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
