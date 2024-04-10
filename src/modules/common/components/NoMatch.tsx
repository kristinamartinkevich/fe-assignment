import React from 'react';
import { Link } from 'react-router-dom';

function NoMatch() {

    return (
        <>
            <h1>404 Not Found</h1>
            <div className="card">
                <Link to="/">Go to the home page</Link>
            </div>
        </>
    )
}

export default NoMatch