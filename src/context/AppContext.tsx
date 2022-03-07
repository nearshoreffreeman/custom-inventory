import React, {createContext} from 'react'
import AppContextInterface from '../interfaces/AppContextInterface';

const AppContext = createContext<AppContextInterface | null>(null);


export default AppContext;