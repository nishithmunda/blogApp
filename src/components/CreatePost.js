import { API, graphqlOperation,Auth } from 'aws-amplify'
import React, { useState,useEffect} from 'react'
import { createPost } from '../graphql/mutations'

const CreatePost=()=>{

    const[postOwnerId,setpostOwnerId]=useState("")
    const[postOwnerUsername,setpostOwnerUsername]=useState("")
    const[postTitle,setpostTitle]=useState("")
    const[postBody,setpostBody]=useState("")

    // const [state , setState] = useState({
    //     postOwnerId :" ",
    //     postOwnerUsername:" ",
    //     postTitle:" ",
    //     postBody:"",

    // })
    useEffect(
              async ()=>{
                   await Auth.currentUserInfo()
                   .then(user=>{
                       console.log("current user",user.username)
                       console.log(user)
                       console.log("ID",user.attributes.sub)
                       
                        const pOwnerId=user.username;
                        setpostOwnerId(pOwnerId )
                      
                       
                        const pOwnerUsername=user.attributes.sub;
                        setpostOwnerUsername(pOwnerUsername)
                    
                       
                   })
               },[]
    )


    function onChangepostTitle(e){
        const pTitle=e.target.value;
        setpostTitle(pTitle)
    }
    function onChangepostBody(e){
        const pBody=e.target.value;
        setpostBody(pBody )
    }

    const handleAddPost=async(event)=>{
         event.preventDefault()

         const input={ 
                       postOwnerId:postOwnerId,
                       postOwnerUsername:postOwnerUsername,
                       postTitle:postTitle,
                       postBody:postBody,
                       createdAt:new Date().toISOString() 
                     }
                     await API.graphql(graphqlOperation(createPost,{input}))
                       
                      
    }
    
    // const handleChangePost=(event)=>{
    //         setState({
    //             [event.target.name]:event.target.value
    //         })
    // }

    return(
        <form className="add-post" onSubmit={handleAddPost} >
            <input type="text" 
                   name="postTitle"
                   required
                   value={postTitle}
                   onChange={onChangepostTitle}
            />
            <textarea type="text"
                      name="postBody" 
                      row="3"
                      cols="40"
                      placeholder="New Blog Post...."
                      className="post_textbox"
                      value={postBody}
                      onChange={onChangepostBody}
                      
            />

            <input type="submit">
            </input>
        </form>
    )
}
export default CreatePost