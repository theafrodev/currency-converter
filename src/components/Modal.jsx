import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { ModalContext } from '../hooks/ModalContext';
import CurrencyContext from '../hooks/CurrencyContext';
import { fetchRates } from '../services/currencyService';

function Modal() {

    const [fxdata, setFxData] = useState();
    const [query, setQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const currencies = useContext(CurrencyContext);
    const modal = useContext(ModalContext);


    async function setRateData(){

        //get data from currency service
       const data = await fetchRates();

       if(!data){
        console.log("Ooops something went wrong, Data Unavailable");
       } else if (data.result === "success"){
            //set conversion rates to fxdata state (local state)
            setFxData(data.conversion_rates);
            setFilteredData(Object.keys(data.conversion_rates))
       } else{
         console.log("A request was sent but an unfavorable response was received")
       }
    }




    function chooseCurrency(selectedCurrency){

        //check for type in modal context and assign it to primary or converted currency in the currency context
        if(modal.type === "primary"){
            currencies.setPrimaryCurrency(selectedCurrency);
        } else{
            currencies.setConvertedCurrency(selectedCurrency);
        }

        //close modal after selecting currency
        modal.toggleDialog();
    }


    useEffect(()=>{
       setRateData();
    },[]);

    useEffect(() => {
        populateCurrencies();
    }, [query])



    function populateCurrencies(){
        if(query){
           const res = Object.keys(fxdata).filter((item) => item.includes(query.toUpperCase()));

           setFilteredData(res);
           
        }else{
            setFilteredData(Object.keys(fxdata ?? {}))
        }
    }
   

  return (
    <div className='fixed frost z-10 inset-0 text-black' aria-labelledby='modal-title' role='dialog' aria-modal='true'>

        <div className='flex h-screen justify-center p-4 text-center items-center'>

            <div className='relative flex flex-col transform rounded-3xl frost p-4 text-white max-h-[90vh] w-full overflow-hidden text-left shadow-xl transition-all sm:w-full sm:max-w-lg'>

                <button className='-my-4 -mr-3 outline-none focus:outline-none border-none bg-transparent fixed right-0 text-4xl items-center justify-center' onClick={()=>modal.setOpen(false)}>&#215;</button>

                <div className='h-full py-5 px-4 border border-[#444444] bg-border rounded-xl'>

                    <h3 className='text-center text-2xl font-semibold pb-7'>Select Currency</h3>
                    
                    {/* conditional rendering of available currencies if rates have been loaded from currency service */}

                    {!fxdata ? 
                        <p>API Information unavailable at this moment</p> 
                        :
                        <div>
                            <input className='w-full border-2 text-black border-gray-300 py-3 px-4 mb-8
                             rounded-lg' type="text" placeholder='Search Here' value={query} onChange={(e)=>setQuery(e.target.value)} />
                            <div className='overflow-y-scroll frost-alt h-[90vh] max-h-[350px] sm:max-h-[50vh] py-9 p-4 rounded-lg'>
                                {filteredData.length === 0 ? <p className='text-center'>Sorry, this currency is not supported</p> : (
                                                                    <div className='grid grid-cols-3 gap-4'>{filteredData.map((value)=>(<button className='bg-black' key={value} onClick={() => chooseCurrency(value)}>{value}</button> ))}</div>
                                )}                            </div>
                        </div> 
                        }
                </div>
            </div>
        </div>
    </div> 
  )
}

export default Modal
