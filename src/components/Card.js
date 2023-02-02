import React from 'react';

function Card(props) {
    const {handleChange, values} = props;

    return (
        <div className="card__wrapper">
            <div className="card__first">
                <form className="card__first__form">
                    <input
                        type="text"
                        className="card__first__number"
                        placeholder='0000 0000 0000 0000'
                        value={values.number}
                        onChange={(e) => {
                            handleChange('number', e.target.value)
                        }}
                    />
                    <div className="card__first__form__box">
                        <input
                            type="text"
                            className="card__first__input"
                            placeholder='ММ'
                            value={values.month}
                            onChange={(e) => {
                                handleChange('month', e.target.value)
                            }}
                        />
                        <p className="card__first__dash">/</p>
                        <input
                            type="text"
                            className="card__first__input"
                            placeholder='ГГ'
                            value={values.year}
                            onChange={(e) => {
                                handleChange('year', e.target.value)
                            }}
                        />
                    </div>
                </form>
            </div>
            <div className="card__second">
                <div className="card__second__box">
                    <div className="card__second__number"></div>
                    <input
                        type="text"
                        className="card__second__cvc"
                        placeholder='CVV/CVC'
                        value={values.cvc}
                        onChange={(e) => {
                            handleChange('cvc', e.target.value)
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Card;
