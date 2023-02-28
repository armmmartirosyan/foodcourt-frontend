import _ from 'lodash';

export default class Validator{
    static validString = (str) => {
        const reg = /^(?=.*[a-zA-Z]).+$/mg;
        return !reg.test(str) ? "value (at least 2 letters)" : true;
    }
    static validObject = (obj) => {
        return _.isEmpty(obj) ? "object" : true;
    }
    static validArray = (array) => {
        return _.isEmpty(array) ? "array" : true;
    }
    static validEmail = (email) => {
        const reg = /^(\w{8,})@([a-z]{2,})\.([a-z]{2,6})$/i;
        return !reg.test(email) ? "email" : true;
    }
    static validPhoneNum = (phone) => {
        const reg = /^\d{10,25}$/;
        return !reg.test(phone) ? "phone number (10-25 numbers)" : true;
    }
    static validNumGreatOne = (num) => {
        const reg = /^[1-9]\d*$/i;
        return !reg.test(num) ? "value (enter only number great 1)" : true;
    }
    static validEverySymbol = (symbol) => {
        const reg = /^.+$/;
        return !reg.test(symbol) ? "value" : true;
    }
}
