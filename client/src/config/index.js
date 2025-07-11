export const signupFormControl=[
{
    name:"userName",
    label:"User Name",
    placeholder:"Enter your user name",
    type:"text",
    componentType:"input",
},
{
    name:"userEmail",
    label:"User email",
    placeholder:"Enter your user email",
    type:"email",
    componentType:"input",
},
{
    name:"password",
    label:"User Password",
    placeholder:"Enter your password",
    type:"password",
    componentType:"input",
}
]

export const signinFormControl=[

{
    name:"userEmail",
    label:"User email",
    placeholder:"Enter your user email",
    type:"email",
    componentType:"input",
},
{
    name:"password",
    label:"User Password",
    placeholder:"Enter your password",
    type:"password",
    componentType:"input",
}
]

export const initialSignInFormData={
    userEmail:"",
    password:"",
};

export const initialSignUpFormData={
    userName:"",
    userEmail:"",
    password:"",
}