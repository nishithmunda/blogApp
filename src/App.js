import DisplayPosts from './components/DisplayPosts'
import './App.css';
import CreatePost from './components/CreatePost'
import { withAuthenticator } from "aws-amplify-react";
import Authentication from './components/Authentication'
import ForgotPassword from './components/ForgotPassword'
function App() {
  return (
    <div className="App">
     <Authentication/>   
     {/* <ForgotPassword/> */}
     {/* <ForgotPassword/> */}
       {/* <CreatePost/>
       <DisplayPosts/> */}
    </div>
  );
}

// export default withAuthenticator(App,{includeGreetings:true});
export default (App);
