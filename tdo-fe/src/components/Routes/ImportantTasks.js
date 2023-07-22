import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/store/hooks';
import useDescriptionTitle from '../hooks/useDescriptionTitle';
import LayoutRoutes from '../Utilities/LayoutRoutes';

const ImportantTasks = ({ socket }) => {
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const [importantTasks, setImportantTasks] = useState([]);

    useEffect(() => {
        const filteredTasks = tasks.filter((task) => task.important);
        setImportantTasks(filteredTasks);
    }, [tasks]);

    useDescriptionTitle('Tasks marked as important', 'Important tasks');

    return <LayoutRoutes title="Important tasks" tasks={importantTasks} socket={socket}></LayoutRoutes>;
};

export default ImportantTasks;
