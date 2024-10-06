const CURRENCY_API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;

export const fetchRates = async ()=>{

    //console.log('loading');

    let data;
    let localTime;
    let currentTime = Math.floor(Date.now()/1000);

    //TODO implement save to database

    //Check if the rates have been saved locally, if not, pull form API
    
    if(localStorage.getItem("apiResponse")){

        data = JSON.parse(localStorage.getItem("apiResponse"));
        localTime = data.time_next_update_unix;
        //console.log(localTime - currentTime)

        //check if the next api fetch time has come, if yes, remove the local data and fetch new
        if((localTime - currentTime) <= 0){
            //console.log((localTime - currentTime) +'expired');
            localStorage.removeItem("apiResponse");
            console.log('fetching data from api');
            const fetchData = await fetch(`https://v6.exchangerate-api.com/v6/${CURRENCY_API_KEY}/latest/USD`).then(res => res.json());
            localStorage.setItem("apiResponse", JSON.stringify(fetchData));
            data = JSON.parse(localStorage.getItem("apiResponse"));
        } 

        console.log(data);
        return data;

    }

    //if there's nothing in local storage, fetch from api
    else{
        console.log('fetching data from api');
        const fetchData = await fetch(`https://v6.exchangerate-api.com/v6/${CURRENCY_API_KEY}/latest/USD`).then(res => res.json());
        localStorage.setItem("apiResponse", JSON.stringify(fetchData));
        data = JSON.parse(localStorage.getItem("apiResponse"));
        console.log(data);
    }

        
    return data;

}


