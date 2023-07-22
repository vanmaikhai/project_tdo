import React from 'react';
import ImportantTasks from '../components/Routes/ImportantTasks';

const ImportantTasksPage = ({ socket }) => {
    return (
        <>
            <ImportantTasks socket={socket} />
        </>
    );
};

export default ImportantTasksPage;
