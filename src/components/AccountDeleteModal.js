import React from 'react';
import Modal from "react-modal";

function AccountDeleteModal(props) {
    const {onClose, showModal, onAgree} = props;

    return (
        <Modal
            isOpen={showModal}
            className="modal header__modal"
            overlayClassName="header__modal__overlay"
            onRequestClose={onClose}
        >
            <div
                className="header__modal__close"
                onClick={onClose}
            >
                X
            </div>
            <div className="header__modal__container">
                <h6 className="header__modal__text">
                    Вы действительно хотите удалить этот аккаунт?
                </h6>
                <div className='header__modal__btn__container'>
                    <button
                        className="header__modal__back btn__danger"
                        onClick={onClose}
                    >
                        Отмена
                    </button>
                    <button
                        className="header__modal__agree btn__bg"
                        onClick={onAgree}
                    >
                        Да
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default AccountDeleteModal;
