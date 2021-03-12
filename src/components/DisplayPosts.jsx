import React,{useEffect, useState} from 'react'
import {listPosts}  from '../graphql/queries'
import { API,graphqlOperation} from "aws-amplify";
import DeletePost from './DeletePosts'
import EditPost from './EditPost'
import {onCreatePost} from '../graphql/subscriptions'

function DisplayPosts(){
   
    const[Posts,setPosts]=useState([])

    async function getPosts(){
        const result= await API.graphql(graphqlOperation(listPosts));
        setPosts(result.data.listPosts.items);
    }
    useEffect( ()=>{
         getPosts();
         const subscription=API.graphql(graphqlOperation(onCreatePost)).subscribe({
             next:(postData)=>{
                getPosts()
                const newPost=postData.value.data.onCreatePost
                console.log("NewPost ",newPost)
                const prevPosts=Posts.filter(post=>post.id!== newPost.id)
                console.log("Previous Post ",prevPosts)
                const updatedPosts=[newPost,...prevPosts]
                console.log(updatedPosts)
                setPosts(updatedPosts)
             }, 
             error: error => console.warn(error) 
        })
        return()=>{
             subscription.unsubscribe()  }
    },[])

     console.log(Posts)
    
    const PList=Posts.map(
        (Posts)=>
    <li className="card" key={Posts.id}>
        <div className="post-content">
           <h1>{Posts.postTitle}</h1> 
           <span>
               BY : {Posts.postOwnerUsername}<br/>
               <time>
                   {new Date(Posts.createdAt).toDateString()}
               </time>
           </span>
        </div>

        <div className="post-body">
            {Posts.postBody}
        </div>    
        <div className="post-button">
            <EditPost/><DeletePost/>
        </div>
        </li>
        
        )
    console.log({PList})
    return(
        <div>

          <ul className="column">{PList}</ul>  
    
        </div>
    )
}
export default DisplayPosts