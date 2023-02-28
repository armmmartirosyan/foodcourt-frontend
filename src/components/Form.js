import React from 'react';
import _ from "lodash";
import PhoneInput from "react-phone-number-input";
import en from 'react-phone-number-input/locale/en'
import PropTypes from "prop-types";
import classNames from "classnames";

function Form(props) {
    const {handleChangeValues, values, drawData, handleSubmit, handleBack} = props;
    const exclude = [
        'remember',
        'back',
        'submit',
        'phoneNum',
    ];

    return (
        <form className='login__form'>
            {
                !_.isEmpty(drawData) && !_.isEmpty(values) ? (
                    drawData.map(temp => (
                        <div
                            key={temp.path}
                            className={classNames(
                                'login__form__box',
                                {fit__content: temp.path === 'back' || temp.path === 'submit'}
                            )}
                        >
                            {
                                !exclude.includes(temp.path) ? (
                                    <>
                                        <label
                                            htmlFor={temp.path}
                                            className="login__form__label"
                                        >
                                            {temp.label}
                                        </label>
                                        <input
                                            type={temp.path === 'password' || temp.path === 'confirmPassword'
                                                ? 'password' : 'text'}
                                            className="login__form__input"
                                            id={temp.path}
                                            value={values[temp.path]}
                                            onChange={(e) => {
                                                handleChangeValues(temp.path, e.target.value)
                                            }}
                                        />
                                    </>
                                ) : null
                            }
                            {
                                temp.path === 'remember' ? (
                                    <>
                                        <label
                                            htmlFor={temp.path}
                                            className="login__form__label"
                                        >
                                            {temp.label}
                                        </label>
                                        <input
                                            type="checkbox"
                                            className="login__form__checkbox"
                                            id={temp.path}
                                            checked={values[temp.path]}
                                            onChange={() => {
                                                handleChangeValues(temp.path, !values[temp.path])
                                            }}
                                        />
                                        <label className="login__form__checkbox__visual" htmlFor={temp.path}>
                                            <span className="login__form__checkbox__visual__first"></span>
                                            <span className="login__form__checkbox__visual__second"></span>
                                        </label>
                                        {/*<div className="login__form__box">*/}
                                        {/*    <input type="checkbox" className="login__form__check" id="login-check">*/}
                                        {/*        <label className="login__form__check__visual" htmlFor="login-check">*/}
                                        {/*            <span className="login__form__check__visual__first"></span>*/}
                                        {/*            <span className="login__form__check__visual__second"></span>*/}
                                        {/*        </label>*/}
                                        {/*</div>*/}
                                    </>
                                ) : null
                            }
                            {
                                temp.path === 'phoneNum' ? (
                                    <>
                                        <label
                                            htmlFor={temp.path}
                                            className="login__form__label"
                                        >
                                            {temp.label}
                                        </label>
                                        <PhoneInput
                                            className='login__form__phone'
                                            international
                                            defaultCountry="AM"
                                            labels={en}
                                            id={temp.path}
                                            value={values[temp.path]}
                                            onChange={(num) => {
                                                handleChangeValues(temp.path, num)
                                            }}
                                        />
                                    </>
                                ) : null
                            }
                            {
                                temp.path === 'back' ? (
                                    <button
                                        className="login__form__submit btn__danger"
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
                                        className="login__form__submit btn__bg"
                                        onClick={handleSubmit}
                                        key={temp.path}
                                    >
                                        {temp.label}
                                    </button>
                                ) : null
                            }
                        </div>
                    ))
                ) : null
            }
        </form>
    );
}

Form.propTypes = {
    handleChangeValues: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    drawData: PropTypes.array.isRequired,
    values: PropTypes.object.isRequired,
}

export default Form;
