import React, { useState } from 'react';
import ModalConfirm from '../Utilities/ModalConfirm';
import { useTranslation } from 'react-i18next';

const Logout = () => {
    const { t } = useTranslation();
    const [showModal, setIsModalShown] = useState(false);

    return (
        <>
            {showModal && <ModalConfirm onClose={() => setIsModalShown(false)} text="You will have to login again!" />}
            <button
                className="mt-auto btn-rose sm:static fixed bottom-3 right-3 z-10 sm:z-0 min-w-max shadow-lg bg-emerald-400  dark:bg-emerald-900 sm:shadow-transparent"
                onClick={() => setIsModalShown(true)}>
                {t('logout')}
            </button>
        </>
    );
};

export default React.memo(Logout);
