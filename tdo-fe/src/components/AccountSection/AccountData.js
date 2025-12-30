import React from 'react';
import avatar1 from '../../assets/avatar-1.jpg';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { menusActions } from '../../redux/store/Menu.store';
import LayoutMenus from '../Utilities/LayoutMenus';
import DarkMode from './DarkMode';
import Language from './Language';
import Logout from './Logout';
import TasksDone from './TasksDone';

const AccountData = () => {
    const menuOpen = useAppSelector((state) => state.menu.menuAccountOpened);

    const dispatch = useAppDispatch();

    const closeMenuHandler = () => {
        dispatch(menusActions.closeMenuAccount());
    };

    return (
        <LayoutMenus menuOpen={menuOpen} closeMenuHandler={closeMenuHandler} className="top-0 right-0 ">
            <section className="p-5 flex flex-col h-full">
                <span className="flex items-center mx-auto">
                    <span className="font-medium">Hi, Khai TK</span>
                    <img src={avatar1} alt="cat" className="w-10 rounded-full ml-4" />
                </span>

                <DarkMode />
                <Language />

                <TasksDone />
                {/* <DeleteTasks /> */}
                <Logout />
            </section>
        </LayoutMenus>
    );
};

export default AccountData;
