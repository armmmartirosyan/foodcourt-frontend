import {combineReducers} from "@reduxjs/toolkit";
import status from "./status";
import slides from "./slides";
import categories from "./categories";
import products from "./products";
import branches from "./branches";
import user from "./user";
import basket from "./basket";
import offers from "./offers";
import paymentTypes from "./paymentTypes";
import order from "./order";
import footer from "./footer";
import comments from "./comments";
import about from "./about";

export default combineReducers({
    status,
    slides,
    categories,
    products,
    branches,
    user,
    basket,
    offers,
    paymentTypes,
    footer,
    order,
    comments,
    about,
})
