import { createContext, useEffect, useState } from "react";
import { initialSignInFormData,initialSignUpFormData } from "@/config";
import { registerService ,loginService, checkAuthService} from "@/services";
import { Skeleton } from "@/components/ui/skeleton";

export const AuthContext=createContext(null)



export default function AuthProvider({children}){

const [signinFormData,setsigninFormData]=useState(initialSignInFormData)
const [signupFormData,setsignupFormData]=useState(initialSignUpFormData)
const [auth,setAuth]=useState({
    authenticate:false,
    user:null,
});

const [loading,setLoading]=useState(true);


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
    
    
    try {
        const data=await checkAuthService();
        if(data.success){
            setAuth({
                authenticate:true,
                user:data.data.user,
            })
            setLoading(false)
        }
        else{
            setAuth({
                authenticate:false,
                user:null,
            })
            setLoading(false)
        }
    } catch (error) {
        console.log("error from my side: ",error)
        if(!error?.response?.data?.success){
            setAuth({
                authenticate:false,
                user:null,
            })
            setLoading(false)
        }
    }
}

function resetCredentials(){
    setAuth({
        authenticate:false,
        user:null
    })
}

useEffect(()=>{
   checkAuthUser();
},[]
)







    return <AuthContext.Provider 
    value={{
        signinFormData,
        setsigninFormData,
        signupFormData,
        setsignupFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials
    }}
    >{children}</AuthContext.Provider>
}