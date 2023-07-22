import React from 'react';
import BtnEditTask from './BtnEditTask';
import BtnMarkAsImportant from './BtnMarkAsImportant';
import BtnDeleteTask from './BtnDeleteTask';
import BtnToggleCompleted from './BtnToggleCompleted';

const ActionsTaskItem = ({ task, isListInView1, socket }) => {
    return (
        <>
            <div
                className={`flex border-dashed border-slate-200 dark:border-slate-700/[.3] ${
                    isListInView1 ? 'items-center' : 'border-t-2 w-full pt-4 mt-4'
                }`}>
                <BtnToggleCompleted taskCompleted={task.completed} taskId={task.id} isListInView1={isListInView1} socket={socket} />
                <BtnMarkAsImportant taskId={task.id} taskImportant={task.important} socket={socket} />
                <BtnDeleteTask taskId={task.id} socket={socket} />
                <BtnEditTask task={task} socket={socket} />
            </div>
        </>
    );
};

export default ActionsTaskItem;
