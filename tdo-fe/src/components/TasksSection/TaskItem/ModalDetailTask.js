import React from 'react';
import Modal from '../../Utilities/Modal';

const ModalDetailTask = ({ task, closeModalTask }) => {
    return (
        <>
            <Modal onClose={closeModalTask} title={`Modal Detail - ${task.id}`}>
                <table>
                    <tr>
                        <td>
                            <b>Title :</b>
                        </td>
                        <td>{task.title}</td>
                    </tr>
                    <tr>
                        <td>
                            <b>Project :</b>
                        </td>
                        <td>{task.dir}</td>
                    </tr>
                    <tr>
                        <td>
                            <b>Description :</b>
                        </td>
                        <td>{task.description ?? 'None'}</td>
                    </tr>
                    <tr>
                        <td>
                            <b>Complete :</b>
                        </td>
                        <td>{task.completed === true ? 'Complete' : 'Uncomplete'}</td>
                    </tr>
                </table>
            </Modal>
        </>
    );
};

export default ModalDetailTask;
