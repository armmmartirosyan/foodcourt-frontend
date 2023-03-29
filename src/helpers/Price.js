export default class Price{
    static price = (price) => {
        let newPrice = '';
        price = price + '';

        for(let i = 0; i < price.length; i++){
            newPrice += price[price.length - 1 - i];

            if(i % 3 === 2 && !price.includes('.')){
                newPrice += ' ';
            }else if(i % 3 === 2 && price.includes('.') && i !== 2){
                newPrice += ' ';
            }
        }

        newPrice = newPrice.split('').reverse().join('');
        newPrice = newPrice.includes('.') ? newPrice : newPrice + '.00';
        return newPrice;
    }
}
