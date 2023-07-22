import React from 'react';
import DoneTasks from '../components/Routes/DoneTasks';

const SearchResultPage = ({ socket }) => {
    return (
        <>
            <DoneTasks done={true} title="Completed tasks" socket={socket}></DoneTasks>
        </>
    );
};

export default SearchResultPage;
