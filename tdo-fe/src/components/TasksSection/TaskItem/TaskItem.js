import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InfosTask from './InfosTask';
import ActionsTaskItem from './ActionsTaskItem';
import ModalDetailTask from './ModalDetailTask';

const TaskItem = ({ isListInView1, task, socket }) => {
    const [modalTaskOpen, setModalTaskOpen] = useState(false);

    const closeModalTask = () => {
        setModalTaskOpen(false);
    };

    const openModalTask = () => {
        setModalTaskOpen(true);
    };

    return (
        <>
            <li key={task.id}>
                <Link
                    to={`/dir/${task.dir}`}
                    title={task.dir}
                    className="ml-auto mr-4 w-min whitespace-nowrap overflow-hidden max-w-[10rem] text-center text-ellipsis bg-rose-200 text-rose-600 px-4 py-1 rounded-t-md transition dark:bg-slate-700 dark:text-slate-200 block hover:bg-rose-300 dark:hover:bg-rose-500">
                    {task.dir}
                </Link>
                <article
                    className={`bg-slate-100 rounded-lg p-3 flex text-left transition hover:shadow-lg hover:shadow-slate-300 dark:bg-slate-800 dark:hover:shadow-transparent ${
                        isListInView1 ? 'flex-row sm:h-32' : 'flex-col h-52'
                    }`}>
                    <InfosTask task={task} isListInView1={isListInView1} openModalTask={openModalTask} />
                    <ActionsTaskItem task={task} isListInView1={isListInView1} socket={socket} />
                </article>
                {modalTaskOpen && <ModalDetailTask task={task} closeModalTask={closeModalTask} />}
            </li>
        </>
    );
};

export default React.memo(TaskItem);
