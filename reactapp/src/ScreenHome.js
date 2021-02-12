import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import {Input,Button} from 'antd';

function ScreenHome(props) {

  const [ signUpUsername, setSignUpUsername ] = useState('');
  const [ signUpEmail, setSignUpEmail ] = useState('');
  const [ signUpPassword, setSignUpPassword ] = useState('');
  const [ isLogin, setIsLogin ] = useState(false);
  const [ message, setMessage ] = useState(' ');

  let handleSubmitSignUp = async (name, email, password) => {
    const response = await fetch('/sign-up', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `usernameFromFront=${name}&emailFromFront=${email}&passwordFromFront=${password}`
    }); 
    const dataResponse = await response.json();
    const userToken = dataResponse.userToken;
    if (userToken) {
      props.addTokenOnSignUpClick(userToken);
    }
    if (dataResponse.result) {    
      setIsLogin(true);
    } else if (dataResponse.message) {
      setMessage(dataResponse.message);
    }
  }

  const [ signInEmail, setSignInEmail ] = useState('');
  const [ signInPassword, setSignInPassword ] = useState('');

  let handleSubmitSignIn = async (email, password) => {
    const response = await fetch('/sign-in', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `emailFromFront=${email}&passwordFromFront=${password}`
    }); 
    const dataResponse = await response.json();
    const userToken = dataResponse.userToken;
    if (userToken) {
      props.addTokenOnSignUpClick(userToken);
    }
    if (dataResponse.login === true) {    
      setIsLogin(true);
    } else if (dataResponse.message) {
      setMessage(dataResponse.message);
    }
  }

  if(isLogin){
  return (
    <Redirect to='/screensource' />
  ); } else { 
  return (
      <div className="Login-page" >
          <div><p>{message}</p></div>

          {/* SIGN-IN */}
          <div className="Signs">
          <div className="Sign">
            <Input className="Login-input" placeholder="arthur@lacapsule.com" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)}  />
            <Input.Password className="Login-input" placeholder="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} />
            <Button style={{width:'80px'}} type="primary" onClick={()=> handleSubmitSignIn(signInEmail,signInPassword)}>Sign-in</Button>
          </div>

          {/* SIGN-UP */}
          <div className="Sign">
            <Input className="Login-input" placeholder="Arthur G" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} />
            <Input className="Login-input" placeholder="arthur@lacapsule.com" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
            <Input.Password className="Login-input" placeholder="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)}/>
            <Button style={{width:'80px'}} type="primary" onClick={()=> handleSubmitSignUp(signUpUsername,signUpEmail,signUpPassword)}>Sign-up</Button>
          </div>
          </div>
      </div> 
  );
}
}

function mapDispatchToProps(dispatch) {
  return {
    addTokenOnSignUpClick: function(token) {
        dispatch( {type: 'addToken', token} )   } }}

export default connect(null, mapDispatchToProps)(ScreenHome);