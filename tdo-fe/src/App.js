import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Navigate, Route, Routes } from 'react-router-dom';
import AccountData from './components/AccountSection/AccountData';
import Footer from './components/Footer';
import Menu from './components/Menu/Menu';
import ModalCreateTask from './components/Utilities/ModalTask';
import { useAppDispatch, useAppSelector } from './redux/store/hooks';
import { modalActions } from './redux/store/Modal.store';
import { tasksActions } from './redux/store/Tasks.store';
import HeaderTasks from './components/TasksSection/HeaderTasks';
import Directory from './components/Routes/Directory';
import TaskOnly from './components/Routes/TaskOnly';
import HomePage from './pages/HomePage';
import TodaysTaskPage from './pages/TodayTask';
import ImportantTasksPage from './pages/ImportantTasksPage';
import CompleteTasksPage from './pages/CompleteTasksPage';
import UnCompleteTaskPage from './pages/UnCompleteTaskPage';
import SearchResultPage from './pages/SearchResultPage';

const App = () => {
    const [socket, setSocket] = useState(null);
    const modal = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const SERVER_POINT = process.env.REACT_APP_BACKEND_URL || 'ws://localhost:9999';
        const socketConnection = io(SERVER_POINT, {
            transports: ['websocket'],
            upgrade: false
        });
        
        setSocket(socketConnection);
        
        return () => socketConnection.close();
    }, []);

    const closeModalCreateTask = () => {
        dispatch(modalActions.closeModalCreateTask());
    };

    const createNewTaskHandler = (task) => {
        if (socket) {
            socket.emit('create-task', task);
            dispatch(tasksActions.addNewTask(task));
        }
    };

    return (
        <div className="bg-slate-200 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
            <>
                {modal.modalCreateTaskOpen && (
                    <ModalCreateTask onClose={closeModalCreateTask} nameForm="Add a task" onConfirm={createNewTaskHandler} />
                )}
                <Menu />
                <main className=" pt-5 pb-8 sm:pb-16 px-3 md:px-8 md:w-full xl:w-8/12 m-auto min-h-screen">
                    <HeaderTasks />
                    <Routes>
                        <Route path="/" element={<HomePage socket={socket} />} />
                        <Route path="/today" element={<TodaysTaskPage socket={socket} />} />
                        <Route path="/important" element={<ImportantTasksPage socket={socket} />} />
                        <Route path="/completed" element={<CompleteTasksPage socket={socket} />} />
                        <Route path="/uncompleted" element={<UnCompleteTaskPage socket={socket} />} />
                        <Route path="/results" element={<SearchResultPage socket={socket} />} />
                        <Route path="/dir/:dir" element={<Directory socket={socket} />} />
                        <Route path="/task/:taskId" element={<TaskOnly socket={socket} />} />
                        <Route path="*" element={<Navigate to="" />} />
                    </Routes>
                </main>
                <Footer />
                <AccountData />
            </>
        </div>
    );
};

export default App;
