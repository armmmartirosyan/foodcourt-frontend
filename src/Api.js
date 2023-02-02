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
    static getProductsList({categorySlug, ...params}) {
        return api.get(`/products/get/category/${categorySlug}`, {params: {...params}});
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
}

export default Api;
