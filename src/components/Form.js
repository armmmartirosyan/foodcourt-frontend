import React from 'react';
import _ from "lodash";
import PhoneInput from "react-phone-number-input";
import ru from 'react-phone-number-input/locale/ru'
import PropTypes from "prop-types";

function Form(props) {
    const {handleChangeValues, values, drawData, handleSubmit} = props;
    const exclude = [
        'remember',
        'submit',
        'phoneNum',
    ];

    return (
        <form className="login__form">
            {
                !_.isEmpty(drawData) && !_.isEmpty(values) ? (
                    drawData.map(temp => (
                        <div className="login__form__box" key={temp.path}>
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
                                            defaultCountry="RU"
                                            labels={ru}
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
