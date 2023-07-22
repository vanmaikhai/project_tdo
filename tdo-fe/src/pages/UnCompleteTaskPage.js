import React from 'react';
import DoneTasks from '../components/Routes/DoneTasks';

const UnCompleteTasksPage = ({ socket }) => {
    return (
        <>
            <DoneTasks done={false} title="Completed tasks" socket={socket} />
        </>
    );
};
export default UnCompleteTasksPage;
