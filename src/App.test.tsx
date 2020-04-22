import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { MOVIE_LIST } from './graphql/queries';

const mocks = [
    {
        request: {
            query: MOVIE_LIST,
        },
        result: {
            data: {
                allMovies: {
                    nodes: [
                        {
                            id: 1,
                            title: 'Test Movie',
                            yearOfRelease: 2020,
                            imdbId: 'tt0000000',
                            myRating: 'Great Test',
                            watchedOn: '22 Apr 2020',
                            discussion: 'link',
                            imdbRating: '10.0',
                            directors: ['Test Director'],
                            topActors: ['Test Actor 1', 'Test Actor 2'],
                            language: 'English',
                            genre: 'Test',
                        },
                    ],
                }
            }
        }
    }
];
