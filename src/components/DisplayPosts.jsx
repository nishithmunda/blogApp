import React,{useEffect, useState} from 'react'
import {listPosts}  from '../graphql/queries'
import { API,graphqlOperation} from "aws-amplify";
import DeletePost from './DeletePosts'
import EditPost from './EditPost'
import {onCreatePost} from '../graphql/subscriptions'

function DisplayPosts(){
   
    const[Posts,setPosts]=useState([])
    useEffect( ()=>{
        async function getPosts(){
            const result= await API.graphql(graphqlOperation(listPosts));
            setPosts(result.data.listPosts.items);
        }
         getPosts();
    //     const createPostListner=API.graphql(graphqlOperation(onCreatePost)).subscribe({
    //         next:(postData)=>{
    //            const newPost=postData.value.data.onCreatePost
    //            const prevPosts=Posts.filter(post=>post.id!== newPost.id)
    //            const updatedPosts=[newPost,...prevPosts]
    //            setPosts({Posts:updatedPosts})
    //         }  
    //    })
    //    return()=>{
    //        createPostListner.unsubscribe()      }
    },[])

    // console.log(Posts)
    
    const PList=Posts.map((Posts)=>
    <li className="card" key={Posts.id}>
        <div className="post-content">
            {Posts.postTitle}</div>

        <div>
            {Posts.postBody}</div>    
        <div className="post-button">
            <EditPost/><DeletePost/>
        </div>
        </li>)
    console.log({PList})
    return(
        <div>

          <ul className="column">{PList}</ul>  
    
        </div>
    )
}
export default DisplayPosts