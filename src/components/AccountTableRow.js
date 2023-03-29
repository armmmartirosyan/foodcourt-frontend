import React from 'react';
import PropTypes from "prop-types";

function AccountTableRow(props) {
    const {item, user, editable, handleClickRow} = props;

    return (
        <div
            className="account__table__row"
            onClick={() => {
                handleClickRow(item.label, item.path, user[item.path])
            }}
        >
            <p className="account__table__label">{item.label}</p>
            {
                item.path === 'phoneNum' ?
                    (<p className="account__table__value">{`+${user[item.path]}`}</p>)
                    : (<p className="account__table__value">{user[item.path]}</p>)
            }
            {
                editable ? (
                    <p className="account__table__arrow">{'>'}</p>
                ) : null
            }
        </div>
    );
}

AccountTableRow.propTypes = {
    handleClickRow: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

export default AccountTableRow;
