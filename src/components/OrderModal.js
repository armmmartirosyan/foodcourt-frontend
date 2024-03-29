import React, {useEffect} from 'react';
import Modal from "react-modal";
import {useDispatch, useSelector} from "react-redux";
import {getActualOrdersRequest} from "../store/actions/order";
import _ from "lodash";
import {toast} from "react-toastify";
import Helper from "../helpers/Helper";
import classNames from "classnames";
import EmptyPage from "../pages/EmptyPage";
import PropTypes from "prop-types";

function OrderModal(props) {
    const {showModal, onClose} = props;
    const dispatch = useDispatch();
    const orders = useSelector(state => state.order.orders);

    useEffect(() => {
        (async () => {
            const data = await dispatch(getActualOrdersRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            }
        })()
    }, []);

    return (
        <Modal
            isOpen={showModal}
            className="order__modal"
            overlayClassName="order__modal__overlay"
            onRequestClose={onClose}
            bodyOpenClassName='hidden'
        >
            <div
                className="order__modal__close"
                onClick={onClose}
            >
                X
            </div>
            <div className="order__modal__container">
                <h1 className="order__modal__header">Актуальные заказы</h1>
                {
                    !_.isEmpty(orders) ? (
                        orders.map(order => (
                            <div
                                className={classNames(
                                    'order__item',
                                    {
                                        process: order.status === 'в процессе',
                                        ready: order.status === 'готовый',
                                        onWay: order.status === 'в пути',
                                    }
                                )}
                                key={order.id}
                            >
                                <p className="order__item__text order__item__id">
                                    {order.id}
                                </p>
                                <p className="order__item__text order__item__status">
                                    {_.capitalize(order.status.split(/(?=[A-Z])/).join(' '))}
                                </p>
                                <p className="order__item__text order__item__receive">
                                    {_.capitalize(order.paymentType.typeName.split(/(?=[A-Z])/).join(' '))}
                                </p>
                            </div>
                        ))
                    ) : (<EmptyPage/>)
                }
            </div>
        </Modal>
    );
}

OrderModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default OrderModal;
