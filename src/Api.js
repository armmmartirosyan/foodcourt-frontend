import axios from "axios";
import Account from "./helpers/Account";

const {REACT_APP_API_URL} = process.env;

const api = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        Authorization: Account.getToken(),
        'Content-Type': 'application/json',
    }
});

class Api {
    //user
    static login(params) {
        return api.post(`/users/login`, {...params});
    }

    static register(params) {
        return api.post(`/users/register`, {...params});
    }

    static getCurrentProfile() {
        return api.get(`/users/current`);
    }

    static modifyProfile(params) {
        return api.put(`/users/current`, {...params});
    }

    static deleteProfile() {
        return api.delete(`/users/current`);
    }

    static getKey(email) {
        return api.post(`/users/forget-pass`, {email});
    }

    static changePassword(params) {
        return api.post(`/users/change-pass`, {...params});
    }

    static getKeyForEmail(email) {
        return api.put(`/users/change-email-step-1`, {email});
    }

    static changeEmail(params) {
        return api.put(`/users/change-email-step-2`, params);
    }

    static activateAccount(email, token) {
        return api.get(`/users/confirm?email=${email}&token=${token}`);
    }

    //basket
    static getBasket() {
        return api.get(`/basket`);
    }

    static addBasket(params) {
        return api.post(`/basket`, {...params});
    }

    static removeFromBasket(id) {
        return api.delete(`/basket/${id}`);
    }

    //products
    static getProductsList(params) {
        return api.get(`/products/get`, {params});
    }

    static getSingleProduct(slugName) {
        return api.get(`/products/get/${slugName}`);
    }

    //branches
    static getBranchesList() {
        return api.get(`/map/get/`);
    }

    static getSingleBranch(id) {
        return api.get(`/map/get/${id}`);
    }

    //Slides
    static getSlidesList() {
        return api.get(`/slides/get/`);
    }

    //Categories
    static getCategoriesList() {
        return api.get(`/categories/get/`);
    }

    //offers
    static getOffers() {
        return api.get(`/offers/get`);
    }

    //payment types
    static getPaymentTypes() {
        return api.get(`/payment-types/allowed`);
    }

    //orders
    static addOrder(params) {
        return api.post(`/orders`, {...params});
    }

    static getActualOrders() {
        return api.get(`/orders/user/not-received`);
    }

    //Footer
    static getFooter() {
        return api.get(`/footer/get`);
    }

    //About
    static getAbout() {
        return api.get(`/about/get`);
    }

    //Comment
    static getComments() {
        return api.get(`/comment/available`);
    }

    static addComment(params) {
        return api.post(`/comment/available`, params);
    }
}

export default Api;
