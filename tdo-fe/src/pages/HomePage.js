import React from 'react';
import Home from '../components/Routes/Home';

const HomePage = ({ socket }) => {
    return (
        <>
            <Home socket={socket} />
        </>
    );
};

export default HomePage;
