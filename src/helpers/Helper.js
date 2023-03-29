export default class Helper {
    static clearAxiosError = (str) => {
        return str.replaceAll("\"", "");
    }
    static shortTxt = (str, length) => {
        return `${str.length > length ? str.slice(0, length) + '...' : str}`;
    }
}
