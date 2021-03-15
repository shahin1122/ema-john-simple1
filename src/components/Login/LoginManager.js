import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';



//Fix firebase default error

export const initializeLoginFramework=()=>{
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }else {
        firebase.app(); // if already initialized, use that one
      }

}

export const handleGoogleSignIn=()=>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    //console.log('clicked');
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res=> {
      const {displayName , photoURL , email} = res.user;
      const isSignedInUser ={
        isSignedIn : true,
        name: displayName,
        email: email,
        photo: photoURL ,
        success : true,
      }
      return isSignedInUser;
      //console.log(displayName , email , photoURL);
    })
    .catch(err=> {
      console.log(err);
      console.log(err.message);
    })
}


 export const handleFbSignIn = ()=>{
    var fbProvider = new firebase.auth.FacebookAuthProvider();
         return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
         
          var credential = result.credential;

          // The signed-in user info.
          var user = result.user;
          user.success = true;
          return user;

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var accessToken = credential.accessToken;

          // ...

         
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;

          // ...
        });

  }

   export const handleSignOut = () => {
    return  firebase.auth().signOut()
    .then(res =>{
        const signedOutUser = {
        isSignedIn: false ,
        name: '',
        photo: '', 
      }
      return signedOutUser ;
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
    console.log('out');
  }

 export const createUserWithEmailAndPassword=(name , email , password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res=> {
      console.log(res);
      const newUserInfo = res.user; 
      newUserInfo.success = true ;//  showing success
      newUserInfo.error = ''; // making error blank
      
      updateUserName(name);
      return newUserInfo;
    })
    
    
    .catch((error) => {
    const newUserInfo = {}
    newUserInfo.error = error.message  //showing error message
    
    newUserInfo.success = false;

    

  });
 }

 export const signInwithEmailAndPassword=(email , password)=>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res=> {
      const newUserInfo = res.user;
      newUserInfo.success = true ;//  showing success
      newUserInfo.error = '';// making error blank
      return newUserInfo;
      //console.log('sign in user info' , res.user);
      
    })


    .catch((error) => {
      const newUserInfo = {}
      newUserInfo.error = error.message //showing error message
      newUserInfo.success = false;
      return newUserInfo;
});

}




  // update User Name using firebase auth
  
  const updateUserName = name =>{

    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name ,
     
    }).then(function() {
      // Update successful.
      console.log('User name updated successfuly');
    }).catch(function(error) {
      console.log(error);
    });


}








