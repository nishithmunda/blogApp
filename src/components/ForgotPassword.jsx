import React,{ useEffect, useReducer, useState }  from 'react'
import { Auth,Hub } from 'aws-amplify';

function ForgotPassword()
{

  
const initalFormstate={
    username:'',
    code:'',
    new_password:''
}
const [formState,updateFormState]=useState(initalFormstate)  
const [stage,setStage]=useState(1) // 1 email stage 2 code stage
// const[username,setusername]=useState('');

function onChange(e){
    updateFormState(()=>({...formState,[e.target.name]:e.target.value}))
}

async  function sendConfirmationCode(){
       const {username}=formState
       await Auth.forgotPassword(username)
       .then(data => console.log(data))
       .catch(err => console.log(err));
        console.log(username)
        setStage(2)
    }
async function resetPassword(){
    const {username,code,new_password}=formState
    console.log("USER",username)
    console.log("CODE",code)
    console.log("NEWPASS",new_password)

    Auth.forgotPasswordSubmit(username, code, new_password)
    .then(console.log("WOW"))
    .catch(err => console.log(err));
}    

    return(
        <div>  

           {stage===1 && (
             <div>         
            <input type="text" name="username" onChange={onChange} placeholder="username" required></input>
            {/* <input type=" email" name="email" onChange={onChange} placeholder=" email"></input> */}
            <button onClick={sendConfirmationCode}>
                SEND VERIFICATION CODE
            </button>
            </div> 
           )}



          {stage===2 && (
             <div>         
            <input type="text" name="username" onChange={onChange} placeholder="username" required></input>
            <input type=" " name="code" onChange={onChange} placeholder="Code" required></input>
            <input type="password" name="new_password" onChange={onChange} placeholder=" new_password" required></input>
            <button onClick={resetPassword}>
             RESET PASSCODE
            </button>
            </div> 
           )}
             
        </div>
    )
}
export default ForgotPassword