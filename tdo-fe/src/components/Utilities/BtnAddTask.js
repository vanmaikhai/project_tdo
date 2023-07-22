import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../redux/store/hooks';
import { modalActions } from '../../redux/store/Modal.store';

const BtnAddTask = ({ className }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onOpenModal = () => {
        dispatch(modalActions.openModalCreateTask());
    };
    return (
        <>
            <button className={`btn  ${className}`} onClick={onOpenModal}>
                {t('add_new_task')}
            </button>
        </>
    );
};

export default BtnAddTask;
