import React, {useState} from "react";
import {connect} from 'react-redux';

import './sign-in.styles.scss';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {googleSignInStart, emailSignInStart} from "../../redux/user/user.actions";

const SignIn = ({emailSignInStart, googleSignInStart}) => {

  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const {email, password} = userCredentials;

    emailSignInStart(email, password);
  };

  const handleChange = event => {
    const {value, name} = event.target;

    setCredentials( {...userCredentials, [name]: value});
  };

  const {email, password} = userCredentials;

  return (
    <div className='sign-in'>
      <h1>I have already an account</h1>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          handleChange={handleChange}
          label='Password'
          required
        />
        <div className='buttons'>
          <CustomButton type='submit'>Sign in</CustomButton>
          <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);