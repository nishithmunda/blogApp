import React,{ useEffect, useState }  from 'react'
import { Auth,Hub } from 'aws-amplify';
import { Checkbox } from 'aws-amplify-react';

function Authentication(){
    
    const initalFormstate={
       username:'',
       password:'',
       email:'',
       authCode:'',
       formType:'signUp'
    }

    const [user,updateuser]=useState(null)
    const [resend,setResend]=useState(0)
    const [resendusername,setresendusername]=useState('')
    useEffect(()=>{
        checkUser()
        setAuthListner()
    },[])

    async function setAuthListner(){
        Hub.listen('auth', (data) => {
            switch (data.payload.event) {

              case 'signOut':
                  console.log('data from event',data);
                  updateFormState(()=>({...formState,formType:"signUp"}))   
                  break;

            }
          });
          
    }

    //TO CHECK USER IS ALREADY LOGGED IN
    async function checkUser(){
        try{
           const loggeduser=await Auth.currentAuthenticatedUser()
           updateuser(loggeduser)
           console.log('user:',loggeduser.username)
           updateFormState(()=>({...formState,formType:"signedIn"}))   
        }
        catch(error){
           console.log("User_Not_Found")
        }
    }

    

    const [formState,updateFormState]=useState(initalFormstate)
    function onChange(e){
          updateFormState(()=>({...formState,[e.target.name]:e.target.value}))
    }
    const {formType}=formState

   //SIGN-UP FUNCTION 
    async function signUp(){
        const{username,email,password}=formState
       try{ await Auth.signUp(
            {
                username,
                password,
                attributes:
                {
                    email
                }
            })
               updateFormState(()=>({...formState,formType:"signIn"})) 
               console.log(username,email) 
          }
        catch(error){
            
            console.log('error signing up:', error);
        }    

    } 

    {/*CODE VERIFICATION*/}
    // async function confirmsignUp(){
    //     const{username,authCode}=formState
    //     await Auth.confirmSignUp(username,authCode)

    //     updateFormState(()=>({...formState,formType:"signIn"}))
    //     console.log(authCode)    
    // } 


    //LOGIN FUNCTION
    async function signIn(){
        const{username,password}=formState
       
       try{ await Auth.signIn(          
                username,
                password
            )
        updateFormState(()=>({...formState,formType:"signedIn"})) 
          }
          catch (error) { 

            console.log('error signing in', error.name);

            //Exception handling
            if(error.name==="UserNotConfirmedException")
             { 
                 setResend(1)
             }
            if(error.name==="NotAuthorizedException")
             {
                 console.log("Password_Incorrect")
             } 
            if(error.name==="UserNotFoundException")
            {
                console.log("User_Not_Found")
            }  
        } 
    } 

 //RESEND CONFIRMATION
    function onChangeResendusername(e){
            setresendusername(e.target.value)
            console.log(resendusername)
    }
          

    async function resendConfirmationCode() {
        try {
            await Auth.resendSignUp(resendusername);
            console.log('code resent successfully');
            resend(0)
        } catch (err) {
            console.log('error resending code: ', err);
        }
    }


    return(
        <div className="App">
          { formType ==='signUp' && (    
             <div>
            <input type="text" name="username" onChange={onChange} placeholder="username"></input>
            <input type="password" name="password" onChange={onChange} placeholder="password" ></input>
            <input type=" email" name="email" onChange={onChange} placeholder=" email" ></input>
            <button onClick={signUp}>  SIGNUP  </button>
            <button onClick={()=>updateFormState(()=>({...formState,formType:"signIn"})) } >  LOGIN-IN </button>
             </div>
          )
         }

{/*CODE VERIFICATION*/}
        {/* {
          formType ==='confirmsignUp' && (    
             <div>
               <input name="authCode" onChange={onChange} placeholder="Confirmation Code"></input>
               <button onClick={confirmsignUp}> CONFIRM-SIGNUP </button>
             </div>
          )
         } */}


        { formType ==='signIn' && (    
             <div>
            <input type="text" name="username" onChange={onChange} placeholder="username"  ></input>
            <input type="password" name="password" onChange={onChange} placeholder="password"  ></input>
            
            <button onClick={signIn}>
                LOGIN-IN
            </button>

            {
                resend==1 &&(
                    <div>
                       <input type="text"  onChange={onChangeResendusername} placeholder="username" ></input>
                       <button onClick={resendConfirmationCode}>
                           RESEND CONFIRMATION
                       </button>
                    </div>
                )
            }
             </div>
          )
         }



         {
             formType ==='signedIn' && (
                 <div>
                 <h1>HOLA</h1>
                 <button onClick={()=>Auth.signOut()}>SIGN-OUT</button>
                 </div>
             )
         }

        </div>
    )
         
    
}
export default Authentication
