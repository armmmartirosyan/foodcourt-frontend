import React, {Fragment} from 'react';
import _ from "lodash";
import PhoneInput from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en'
import PropTypes from "prop-types";
import classNames from "classnames";

function Form(props) {
    const {handleChangeValues, values, drawData, handleSubmit, handleBack, onClickForgotPassword, title=''} = props;
    const exclude = [
        'remember',
        'back',
        'submit',
        'phoneNum',
    ];

    return (
        <form className='message__form'>
            {title ? <h1 className="login__title">{title}</h1> : null}
            {
                !_.isEmpty(drawData) && !_.isEmpty(values) ? (
                    drawData.map(temp => (
                        <Fragment key={temp.path}>
                            {
                                temp.path !== 'submit' && temp.path !== 'back' ? (
                                    <div
                                        key={temp.path}
                                        className='message__area__container'
                                    >
                                        {
                                            !exclude.includes(temp.path) ? (
                                                <div className='message__area__inner'>
                                                    <input
                                                        type={temp.path === 'password' || temp.path === 'confirmPassword'
                                                            ? 'password' : 'text'}
                                                        id={temp.path}
                                                        value={values[temp.path]}
                                                        disabled={temp.disabled}
                                                        autoComplete='off'
                                                        onChange={(e) => {
                                                            handleChangeValues(temp.path, e.target.value)
                                                        }}
                                                        className={classNames(
                                                            'message__area',
                                                            {filled: values[temp.path]}
                                                        )}
                                                    />
                                                    <label htmlFor={temp.path} className="input__label">
                                                        {temp.label}
                                                    </label>
                                                    <div className="message__form__line"></div>
                                                </div>
                                            ) : null
                                        }
                                        {
                                            temp.path === 'phoneNum' ? (
                                                <div className='message__area__inner'>
                                                    <PhoneInput
                                                        className={classNames(
                                                            'message__area',
                                                            {filled: true}
                                                        )}
                                                        autoComplete='off'
                                                        international
                                                        defaultCountry="RU"
                                                        labels={en}
                                                        disabled={temp.disabled}
                                                        id={temp.path}
                                                        value={values[temp.path]}
                                                        onChange={(num) => {
                                                            handleChangeValues(temp.path, num)
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={temp.path}
                                                        className="input__label"
                                                    >
                                                        {temp.label}
                                                    </label>
                                                    <div className="message__form__line"></div>
                                                </div>
                                            ) : null
                                        }
                                        {
                                            temp.path === 'remember' ? (
                                                <div className='login__form__box'>
                                                    <div className="login__form__checkbox__container">
                                                        <input
                                                            type="checkbox"
                                                            className="login__form__checkbox"
                                                            id={temp.path}
                                                            checked={values[temp.path]}
                                                            disabled={temp.disabled}
                                                            autoComplete='off'
                                                            onChange={() => {
                                                                handleChangeValues(temp.path, !values[temp.path])
                                                            }}
                                                        />
                                                        <label className="login__form__checkbox__visual" htmlFor={temp.path}>
                                                            <span className="login__form__checkbox__visual__first"></span>
                                                            <span className="login__form__checkbox__visual__second"></span>
                                                        </label>
                                                        <label
                                                            htmlFor={temp.path}
                                                            className="login__form__label"
                                                        >
                                                            {temp.label}
                                                        </label>
                                                    </div>
                                                    {
                                                        onClickForgotPassword ? (
                                                            <button
                                                                className="login__forgot"
                                                                onClick={onClickForgotPassword}
                                                            >
                                                                Забыли пароль ?
                                                            </button>
                                                        ) : null
                                                    }
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                ) : null
                            }
                            {
                                temp.path === 'back' ? (
                                    <button
                                        className="btn__danger"
                                        onClick={handleBack}
                                        key={temp.path}
                                    >
                                        {temp.label}
                                    </button>
                                ) : null
                            }
                            {
                                temp.path === 'submit' ? (
                                    <button
                                        className="message__form__btn"
                                        onClick={handleSubmit}
                                        key={temp.path}
                                    >
                                        {temp.label}
                                    </button>
                                ) : null
                            }
                        </Fragment>
                    ))
                ) : null
            }
        </form>
    );
}

Form.propTypes = {
    handleChangeValues: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleBack: PropTypes.func,
    drawData: PropTypes.array.isRequired,
    values: PropTypes.object.isRequired,
    onClickForgotPassword: PropTypes.func,
    title: PropTypes.string,
}

export default Form;
