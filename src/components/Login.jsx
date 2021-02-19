import { Auth } from 'aws-amplify';



function Login(){  
    const username="Aniket12"
    const password="aniket12"
    async function signIn() {
        try {
            const user = await Auth.signIn(username, password);
            console.log(user);
        } catch (error) {
            console.log('error signing in', error);
        }
    }
 return(
     <div>
         <center>
         <button onClick={signIn}>
             Login
         </button>
         </center>
     </div>
 )    
 }
export default Login
