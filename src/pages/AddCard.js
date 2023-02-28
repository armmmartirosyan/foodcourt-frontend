// import React, {useCallback, useEffect, useState} from 'react';
// import Wrapper from "../components/Wrapper";
// import {useDispatch, useSelector} from "react-redux";
// import Card from "../components/Card";
// import _ from 'lodash';
// import {getCurrentAccountRequest} from "../store/actions/user";
// import {toast} from "react-toastify";
// import Helper from "../helpers/Helper";
// import {PaymentElement, Elements} from "@stripe/react-stripe-js";
// import Api from "../Api";
// import {loadStripe} from "@stripe/stripe-js";
//
// function AddCard() {
//     const dispatch = useDispatch();
//     const [stripeData, setStripeData] = useState({});
//     const [values, setValues] = useState({
//         number: '',
//         month: '',
//         year: '',
//         cvc: ''
//     });
//
//     useEffect(() => {
//         (async () => {
//             const newData = await dispatch(getCurrentAccountRequest());
//
//             if (!_.isEmpty(newData.payload) && (newData.payload?.status === 'error' || newData.payload?.status !== 'ok')) {
//                 toast.error(_.capitalize(Helper.clearAxiosError(newData.payload?.message)));
//                 return;
//             }
//
//             let publicKey = '';
//
//             const {data} = await Api.publicKey()
//                 .then((d) => d)
//                 .catch((e) => e);
//
//             if (!_.isEmpty(data) && data.publicKey) publicKey = data.publicKey;
//
//             const {data: {intent}} = await Api.setupIntent();
//
//             console.log('intent', intent);
//
//             const stripePromise = loadStripe(publicKey);
//
//             const options = {
//                 clientSecret: intent,
//             };
//
//             setStripeData({stripePromise, intent});
//         })()
//     }, []);
//
//     const handleChange = useCallback((key, val) => {
//         const reg = /^\d*$/;
//
//         if (reg.test(val)) {
//             if ((key === 'month' && val <= 12 && val.length <= 2 && val !== '00')
//                 || (key === 'cvc' && val.length <= 3)
//                 || (key === 'year' && val.length <= 4)
//                 || (key === 'number' && val.length <= 16)) {
//                 setValues({
//                     ...values,
//                     [key]: val,
//                 })
//             }
//         }
//     }, [values]);
//
//     return (
//         <Wrapper
//             pageName='Add card'
//         >
//             <section className="card__add">
//                 <div className="container">
//                     <h1 className="card__add__title">Add card</h1>
//                     {
//                         !_.isEmpty(stripeData) ? (
//                             <Elements
//                                 stripe={stripeData.stripePromise}
//                                 options={stripeData.intent}
//                             >
//                                 <Card
//                                     values={values}
//                                     stripeData={stripeData}
//                                     handleChange={handleChange}
//                                 />
//                             </Elements>
//                         ) : null
//                     }
//                 </div>
//             </section>
//         </Wrapper>
//     );
// }
//
// export default AddCard;
