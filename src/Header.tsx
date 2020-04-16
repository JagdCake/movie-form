import React from 'react';
import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = (): ReactElement => {
    return (
        <header className="m-auto py-12">
            <nav>
                <ul className="text-center text-4xl">
                    <li>
                        <Link
                            to="/movies/add"
                            className="p-4 rounded-lg bg-white text-black text-center"
                        >
                            Add a movie!
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
