
import React, { useContext,useState } from 'react'

import { TabsList, TabsTrigger ,Tabs,TabsContent} from "@radix-ui/react-tabs"
import { GraduationCap, HamburgerIcon } from "lucide-react"
import { Link } from "react-router-dom"
import CommonForm from '@/components/common-form'
import { signupFormControl ,signinFormControl} from '@/config'
import "../../App.css"
import { Card,CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthContext } from '@/context/auth-context'



const AuthPage = () => {

const [activeTab,setActiveTab]=useState('signin')
const {signinFormData,setsigninFormData,signupFormData,setsignupFormData,handleRegisterUser,handleLoginUser}=useContext(AuthContext)


function handleTabChange(value){
  setActiveTab(value)
}

function checkIfSignInFormIsValid(){
  return signinFormData && signinFormData.userEmail!=='' && signinFormData.password!=='';
}

function checkIfSignUpFormIsValid(){
  return signupFormData && signupFormData.userName!=='' && signupFormData.userEmail!=='' && signupFormData.password!=='';
}

console.log("no error is here:",signinFormData);


  return (
    <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center border-b">
            <Link to={"/"} className="flex items-center justify-center">
                <GraduationCap className="h-8 w-8 mr-4" />
                <span className="font-extrabold text-xl">LMS LEARN</span>
            </Link>
        </header>
        <div className="flex items-centre justify-center min-h-screen bg-background">
          <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin" className="data-[state=]: data-[state=active]:text-black border p-2 rounded-md">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className=" data-[state=active]:text-black border p-2 rounded-md">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value='signin' className='m-1'>
              <Card className="p-6 space-y-4">
                <CardHeader>
                  <CardTitle>Sign in to your account</CardTitle>
                  <CardDescription>
                    Enter your email and password to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CommonForm 
                    formControls={signinFormControl}
                    buttonText={'Sign In'}
                    formData={signinFormData}
                    setFormData={setsigninFormData}
                    isButtonDisabled={!checkIfSignInFormIsValid()}
                    handleSubmit={handleLoginUser}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='signup'>
              <Card className="p-6 space-y-4">
                <CardHeader>
                  <CardTitle>Create a new account</CardTitle>
                  <CardDescription>
                    Enter your details to get started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CommonForm 
                    formControls={signupFormControl}
                    buttonText={'Sign Up'}
                    formData={signupFormData}
                    setFormData={setsignupFormData}
                    isButtonDisabled={!checkIfSignUpFormIsValid()}
                    handleSubmit={handleRegisterUser}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    </div>
  )
}

export default AuthPage