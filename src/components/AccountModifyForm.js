import React from 'react';
import PhoneInput from "react-phone-number-input";
import ru from 'react-phone-number-input/locale/ru'
import PropTypes from "prop-types";

function AccountModifyForm(props) {
    const {value, handleChangeValue, handleBack, handleModifyProfile} = props;

    return (
        <form className='account__form'>
            <div className='login__form__box'>
                <label
                    htmlFor={value.key}
                    className="login__form__label"
                >
                    {value.name}
                </label>
                {
                    value.key === 'phoneNum' ? (
                        <PhoneInput
                            className='login__form__phone'
                            international
                            defaultCountry="RU"
                            labels={ru}
                            id={value.key}
                            value={value.value[0] !== "+" ? "+" + value.value : value.value}
                            onChange={(num) => {
                                handleChangeValue(num)
                            }}
                        />
                    ) : (
                        <input
                            type='text'
                            className="login__form__input"
                            id={value.key}
                            value={value.value}
                            onChange={(e) => {
                                handleChangeValue(e.target.value);
                            }}
                        />
                    )
                }
            </div>

            <div className="account__form__btn__container">
                <button
                    className="login__form__submit btn__border"
                    onClick={handleBack}
                >
                    Back
                </button>
                <button
                    className="login__form__submit btn__bg"
                    onClick={handleModifyProfile}
                >
                    Modify
                </button>
            </div>
        </form>
    );
}

AccountModifyForm.propTypes = {
    handleModifyProfile: PropTypes.func.isRequired,
    handleChangeValue: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
}

export default AccountModifyForm;
