import React from 'react';
import TodaysTasks from '../components/Routes/TodaysTasks';

const TodaysTaskPage = ({ socket }) => {
    return (
        <>
            <TodaysTasks socket={socket} />
        </>
    );
};

export default TodaysTaskPage;
