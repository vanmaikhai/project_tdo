import React from 'react';
import LayoutRoutes from '../Utilities/LayoutRoutes';
import { useAppSelector } from '../../redux/store/hooks';
import useDescriptionTitle from '../hooks/useDescriptionTitle';

const Home = ({ socket }) => {
    const tasks = useAppSelector((state) => state.tasks.tasks);

    useDescriptionTitle('Organize your tasks', 'All tasks');
    return <LayoutRoutes title="All tasks" tasks={tasks} socket={socket}></LayoutRoutes>;
};

export default Home;
