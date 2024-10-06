import React, { useContext, useEffect, useState } from 'react'
import CurrencySelector from './CurrencySelector'
import CurrencyContext from '../hooks/CurrencyContext'
import { fetchRates } from '../services/currencyService';


function AmountInput() {

  const currencies = useContext(CurrencyContext);
  const primaryCurrency = currencies.primaryCurrency;
  const primaryAmount = currencies.primaryAmount;
  const convertedCurrency = currencies.convertedCurrency;
  const convertedAmount = currencies.convertedAmount;
  //const setPrimaryCurrency = currencies.setPrimaryCurrency;
  const setPrimaryAmount = currencies.setPrimaryAmount;
  const setConvertedAmount = currencies.setConvertedAmount;
  const [rate, setRate] = useState();

  //Convert to dollar and convert to selected currency
  async function calculate(){
    const data = await fetchRates();
    let dollarAmount = primaryAmount/data.conversion_rates[primaryCurrency];
    let converted = dollarAmount*data.conversion_rates[convertedCurrency];
    let rateCalc = (1/data.conversion_rates[primaryCurrency])*data.conversion_rates[convertedCurrency];
    //set converted amount to converted in 2 decimal places
    setConvertedAmount(Math.round(converted*100)/100);
    setRate(rateCalc);
  }

  function checkValues(){
    calculate(primaryAmount);
  }

  useEffect(()=>{
    checkValues();
  });

  return (
    <>
        <div className='text-sm border border-gray-800 bg-border text-white rounded-full w-max px-8 py-3 m-auto'> <span> 1 &nbsp; {primaryCurrency} &nbsp; </span> = &nbsp; <span> {convertedCurrency} &nbsp; {rate} </span></div>

        <div>
            <label className='block text-left m-0 pb-2' htmlFor="PrimaryAmount">From</label>
            <div className='bg-white rounded-lg p-1 pl-4 flex'>
              <input className='w-full font-bold text-2xl bg-white text-black focus:outline-none' id="PrimaryAmount" onChange={e => setPrimaryAmount(e.target.value)} type="number" value={primaryAmount}/>
              <CurrencySelector type="primary"/>
            </div>
        </div>

        <div>
            <label className='block text-left m-0 pb-2' htmlFor="ConvertedAmount">To</label>
            <div className='bg-border rounded-lg p-1 pl-4 flex'>
              <input className='w-full font-bold text-2xl bg-border text-white focus:outline-none' id="ConvertedAmount" type="number" value={convertedAmount} disabled/>
              <CurrencySelector/>
            </div>
        </div>
    </>
  )
}

export default AmountInput
