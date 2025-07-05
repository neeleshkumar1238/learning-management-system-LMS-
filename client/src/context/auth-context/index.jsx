import { createContext, useEffect, useState } from "react";
import { initialSignInFormData,initialSignUpFormData } from "@/config";
import { registerService ,loginService, checkAuthService} from "@/services";

export const AuthContext=createContext(null)



export default function AuthProvider({children}){

const [signinFormData,setsigninFormData]=useState(initialSignInFormData)
const [signupFormData,setsignupFormData]=useState(initialSignUpFormData)
const [auth,setAuth]=useState({
    authenticate:false,
    user:null,
});

async function handleRegisterUser(event) {
    event.preventDefault();
    const data=await registerService(signupFormData);
    
}

async function handleLoginUser(event) {
    event.preventDefault();
    const data=await loginService(signinFormData);
    
    if(data.success){
        sessionStorage.setItem('accessToken',JSON.stringify(data.data.accessToken))
        setAuth({
            authenticate:true,
            user:data.data.user
        })
    }
    else{
        setAuth({
            authenticate:false,
            user:null
        })
    }
}

async function checkAuthUser() {
    const data=await checkAuthService();
    
    if(data.success){
        setAuth({
            authenticate:true,
            user:data.data.user,
        })
    }
    else{
        setAuth({
            authenticate:false,
            user:null,
        })
    }
}

useEffect(()=>{
   checkAuthUser();
},[]
)

console.log(auth)





    return <AuthContext.Provider 
    value={{
        signinFormData,
        setsigninFormData,
        signupFormData,
        setsignupFormData,
        handleRegisterUser,
        handleLoginUser,
        auth
    }}
    >{children}</AuthContext.Provider>
}