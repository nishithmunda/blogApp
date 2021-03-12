import { API, graphqlOperation,Auth } from 'aws-amplify'
import React, { useState,useEffect, useRef} from 'react'
import { createPost } from '../graphql/mutations'

const CreatePost=()=>{

    const initialFormstate={
           postOwnerId:'',
           postOwnerUsername:'',
           postTitle:'',
           postBody:''
    }
    const [formState,updateFormState]=useState(initialFormstate)
    function onChange(e){
            updateFormState(()=>({...formState,[e.target.name]:e.target.value}))        
                       }
   useEffect(
              async ()=>{                
                   await Auth.currentUserInfo()
                   .then(user=>{
                       console.log("current user",user.username)
                       console.log(user)
                       console.log("ID",user.attributes.sub)

                       updateFormState(()=>({...formState,postOwnerId:user.attributes.sub,
                                                          postOwnerUsername:user.username}))

                       
                   })
               },[]
   )

    const handleAddPost=async(event)=>{
         event.preventDefault()
         const {postOwnerId,postOwnerUsername,postTitle,postBody}=formState

         const input={ 
                       postOwnerId:postOwnerId,
                       postOwnerUsername:postOwnerUsername,
                       postTitle:postTitle,
                       postBody:postBody,
                       createdAt:new Date().toISOString() 
                     }
         console.log("INPUT",input)            
try
      { await API.graphql(graphqlOperation(createPost,{input}))}
catch(error){
    console.log(error)
}      
    
       updateFormState({...formState,postBody:"",postTitle:""})                           
    }
    

    return(
        <form className="add-post" onSubmit={handleAddPost} >
            <input type="text" 
                   name="postTitle"
                   required
                   onChange= {onChange}
                   placeholder="blog_title"
            />
            <textarea type="text"
                      name="postBody" 
                      row="3"
                      cols="40"
                      placeholder="New Blog Post...."
                      className="post_textbox"
                      onChange={ onChange}
                      
            />

            <button  type="submit" className="btn">
                SUBMIT
            </button>
        </form>
    )
}
export default CreatePost