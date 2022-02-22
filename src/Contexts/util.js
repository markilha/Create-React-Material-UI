import React, {useState, createContext} from 'react'

export const UtilContext = createContext({});

function UtilProvider({children}){
    const [quantLotes, setQuantLotes] = useState('0');
    const [signed,setSigned]= useState(true);
    const[loading,setLoading] = useState(false);

    return(       
        <UtilContext.Provider value={{quantLotes,setQuantLotes,signed,setSigned,loading,setLoading}}>
            {children}            
        </UtilContext.Provider>
    )
}

export default UtilProvider;    