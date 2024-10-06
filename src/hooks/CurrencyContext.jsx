import { createContext, useState } from "react";

//create currency context

// export const currencyContext = createContext({currencies: 'USD', setPrimaryCurrency: ()=>{}});
export const CurrencyContext = createContext();

export function CurrencyProvider({children}){
    
    const [primaryCurrency, setPrimaryCurrency] = useState('USD');
    const [convertedCurrency, setConvertedCurrency] = useState('GHS');
    const [primaryAmount, setPrimaryAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(1)

    //expose variables and methods (states)
    const value = {
        primaryCurrency,
        setPrimaryCurrency,
        convertedCurrency,
        setConvertedCurrency,
        primaryAmount,
        setPrimaryAmount,
        convertedAmount,
        setConvertedAmount
    };


    return(

        //enables other elements to be wrapped by the context provider
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );

}

export default CurrencyContext;