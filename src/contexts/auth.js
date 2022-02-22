import React from 'react'
import api from '../services/api';

export const AuthContext = React.createContext({});

function AuthProvider({children}){
    const [quantLotes, setQuantLotes] = React.useState('0');
    const [user,setUser]= React.useState(null);
    const[loading,setLoading] =React.useState(false);
    const[signed,setSigned] =React.useState(false);


    React.useEffect(()=>{
        function loadStorage(){
            const storageUser = localStorage.getItem('SistemaUser');
            if(storageUser){
                setUser(JSON.parse(storageUser));              
                setLoading(false)
            }
        }
        loadStorage(); 
       
    },[])

    function storageUser(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data));
      }    

    function signIn(email, senha){
        let data = {
            uid: 1,
            nome: 'Marco Antonio',
            email: email,
            senha: senha,
            avatarUrl: null
          };
          storageUser(data);
        
    }

    // async function signIn(email,senha){
    //     const query = {
    //         useremail:email,
    //         usersenha:senha
    //     }
    //     const response = await api.post('/login',query);
    //     console.log(response.data)
    // }
   

    return(       
        <AuthContext.Provider value={{
            quantLotes,
            setQuantLotes,
            signed: !!user,
            loading,
            setLoading,
            signIn
            }}>
            {children}            
        </AuthContext.Provider>
    )
}

export default AuthProvider;    