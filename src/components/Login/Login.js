
import {useContext, useState} from 'react'
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInwithEmailAndPassword } from './LoginManager';






function Login() {

  const [newUser , setNewUser] = useState(false)

  const [user , setUser] = useState({
    isSignedIn : false ,
    
    name: '',
    email: '',
    photo: '',
    password : '',
    error: '',
    success: false ,
//passing object 

  })

  initializeLoginFramework();

  //we have to connected it from Context form App.js Context declearation
  const [loggedInUser , setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  let {from} = location.state || {from: {pathname : "/"}}


  const googleSignIn=()=>{
      handleGoogleSignIn()
      .then(res=> {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from); // from react router || Identifying... 
      })
  }


  const signOut =() =>{
      handleSignOut()
      .then(res=>{
          setUser(res);
          setLoggedInUser(res);
          history.replace(from); // from react router || Identifying... 

      })
  }

  const fbSignIn =()=>{
      handleFbSignIn()
      .then(res=>{
          setUser(res);
          setLoggedInUser(res);
          history.replace(from); // from react router || Identifying... 
      })
  }

  // google provider
  

  // facebook provider
  




  

  


  

   





  //Form submit event listener

  const handleSubmit=(event)=>{
   //console.log('making form');
   //console.log(user.email ,  user.password);

   if(newUser && user.email && user.password){
       createUserWithEmailAndPassword(user.name ,user.email , user.password)
       .then (res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from); 

       } )
    
    // firebase authentication form firebase > doc > Authentication > web > password authentication
    


   } 


  if(!newUser && user.email && user.password){
      signInwithEmailAndPassword(user.email , user.password)
      .then (res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from); 

       } )
   

  }


  //  Default behavior and avoiding reload
   event.preventDefault();
  }







  //Input form handeler

  const handleBlur=(e)=>{

    
    //console.log(e.target.value);
    
    // email validation
    let isFieldValid = true ;

    if(e.target.name === 'email'){
      
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
      //console.log(isEmailValid);

    }
    if(e.target.name ==='password'){
      const isPasswordValid = e.target.value.length > 6 ;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid= isPasswordValid && passwordHasNumber;

    }

    if(isFieldValid){
          const newUserInfo = {...user};
          newUserInfo[e.target.name] = e.target.value; 
          setUser(newUserInfo)
    }


  }





  return (
    <div style={{textAlign:'center'}}>
     {
       
        user.isSignedIn?
        <button onClick={signOut}>Sign out</button>: 
        <button onClick={googleSignIn}>Sign in</button> 
     }

      <br/>

     {/* SIgn in using facebook */}

     <button onClick={fbSignIn}>Sign in using facebook</button>


      {
           
        user.isSignedIn && <div>
          
          <img src={user.photo} alt=""/>
           <h1>Welcome : {user.name}</h1> 

           </div>
      }

      

     {/* making a  signin form */}


      <h1>Our Own Authentication</h1>
      {/* making true for newUser */}

      <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label>
      <br/>

      <form onSubmit={handleSubmit} action="">

        {/* maka a conditional for new user */}

        { newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your Name: "/>}

        <br/><br/>
        <input type="text" onBlur={handleBlur} name="email" placeholder="Email" required/>
        <br/> <br/>
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Password" required/>
        <br/><br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>

      </form>

      <p style={{color: 'red'}}> {user.error}</p>
      {
        user.success &&  <p style={{color: 'green'}}>User {newUser? 'created' : 'logged in'} successfully</p>
      }
      


      
    </div>
  );
}

export default Login;
