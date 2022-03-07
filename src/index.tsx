import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

import "./main.css";


document.addEventListener('DOMContentLoaded',  ()=>{

    const mainEl = document.querySelector('#casauto-inventory');
    const preData = mainEl.querySelector('pre').innerHTML;
    const data:any = JSON.parse(preData);
    console.log(data);
    
    ReactDOM.render(<App {...data} />, mainEl);  
    
})