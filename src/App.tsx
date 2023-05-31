import React, { useContext } from 'react';
import styled from 'styled-components';
import BarLoader from "react-spinners/BarLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Reset } from 'styled-reset';
import Layout, { Container, RegistrationPannel, LoginForm, BGImage } from "./Layout";
import UseRipple from './UseRipple';
import AppLogo from './AppLogo';
import Button from './Button';
import FaveVerse from './FaveVerse';
import IconInput from './IconInput';
import Bubble from './Bubble';
import Avatar from './Avatar';
import OtpInput from './OTPField';
import MessageBox from './MessageBox';
import ExpirationTimer from './ExpirationTimer';
import SnackBars from './SnackBar/SnackBars';
import axios from 'axios';

import useAddSnackBar from './SnackBar/useSnackBar';

interface ISnackBar {
  id: number, 
  text: string, 
  type: "error" | "success" | "info" | "warning" | "default", 
  durationInSec: number
};

function App() {
  const [user, setUser] = React.useState<{fullName: string, email: string, avatar: string, UID: string, congregation: string} | null>(null);
  const [emailError, setEmailError] = React.useState<null | "init" | string>("init");
  const [passwordError, setPasswordError] = React.useState<null | "init" | string>("init");
  const [emailInputVal, updateEmailInputVal] = React.useState<null | string>(null);
  const [passwordInputVal, updatePasswordInputVal] = React.useState<null | string>(null);
  const [forgotPassFormState, setForgotPassFormState] = React.useState(false);
  const [waitingForOTP, setWaitingForOTPState] = React.useState(false);
  const [findAccountEmailFieldVal, updateFindAccountEmailFieldVal] = React.useState<null | string>(null);
  const [findAccountEmailFieldError, setFindAccountEmailFieldError] = React.useState<null | "init" | string>("init");
  const [loginError, setLoginError] = React.useState<null | string>(null);
  const [otpExpiration, setOtpExpiration] = React.useState<null | Date>(null);
  
  const [isLoading, setIsLoading] = React.useState(false);

  const addSnackBar = useAddSnackBar();

  React.useEffect(() => {
    emailInputVal !== null && 
    setEmailError(validateEmail(emailInputVal));
  }, [emailInputVal]);

  React.useEffect(() => {
    findAccountEmailFieldVal !== null && 
    setFindAccountEmailFieldError(validateEmail(findAccountEmailFieldVal))
  }, [findAccountEmailFieldVal]);

  React.useEffect(() => {
    passwordInputVal !== null &&
    setPasswordError((function validatePassword(password: string): null | string {
      if (password.length == 0) {
        return "Password can't be empty";
      }
      return null;
    })(passwordInputVal))
  }, [passwordInputVal]);

  React.useEffect(() => {
    setIsLoading(true);
    axios.post('/get-pending-user-login')
    .then(res => {
      const user = res.data;
      setUser({...user, fullName: user.name});
      setIsLoading(false);
    })
    .catch(err => {
      setUser(null);
      setIsLoading(false);
    })
  }, [])
  return (
    <React.Fragment>
      <Reset />
        <div className="App">
          <Layout>
            <SnackBars position='bottom-left' />
            <BGImage />
            <Container>
              <div className="loading-indicator-area">
                <BarLoader color="rgb(21, 169, 253)" cssOverride={{height: "100%", width: "100%"}} loading={isLoading} />
              </div>
              <RegistrationPannel>
                <div className="bg-image"></div>
                <div className="cover-effect"></div>
                {/* <Bubble color='#1af052' size="110px" right="-55px" bottom="50px" /> */}
                <Bubble color='#9C27B0' size="80px" right="155px" bottom="50px" />
                <Bubble color='#2196F3' size="40px" right="95px" top="230px" />
                <Bubble color='#009688' size="120px" left="-35px" top="50px" />
                <FaveVerse>
                  <p className="verse"> Matthew 28:19-20 (NIV)</p>
                  <div className="verse-text">
                    <FontAwesomeIcon icon={["fas", "quote-left"]} pull="left" size="lg" />
                    Therefore go and make disciples of all nations, baptizing them 
                    in the name of the Father and of the Son and of the Holy Spirit, 
                    and teaching them to obey everything I have commanded you. And 
                    surely I am with you always, to the very end of the age.”
                  </div>
                </FaveVerse>
                <div className="register-btn-area">
                  <h1>Register your local Church of Christ Congregation!</h1>
                  <Button color='white' bgColor='orange' onClick={(e) => window.location.replace('/register')}>
                  <UseRipple />
                  Register
                </Button>
                </div>
              </RegistrationPannel>
              <LoginForm>
                <Bubble color='#1af052' size="110px" left="-35px" bottom="50px" />
                <AppLogo>
                    <img src='/fbims-logo.png' />
                </AppLogo>
                {
                  (user && !waitingForOTP) || (user && !forgotPassFormState )?
                  <div className="user-info-group">
                    <Avatar src={user.avatar} alt={user.fullName} size="50px" />
                    <p className="user-fullname">{user.fullName}</p>
                    <p className="user-email">{user.email}</p>
                    <i className="not-you-link" 
                    onClick={(e) => {
                      setIsLoading(true);
                      axios.delete('/remove-pending-user-login')
                      .then(res => {
                        const flag = res.data.success;
                        if(flag) {
                          setUser(null);
                          updateEmailInputVal(null);
                          setEmailError('init');
                          updatePasswordInputVal(null);
                          setPasswordError('init');
                          setLoginError(null);
                        }
                        setIsLoading(false);
                      })
                      .catch(err => {
                        setIsLoading(false);
                      })
                    }}>Not you?</i>
                  </div> : ""
                }
                <div className="form-group">
                  {
                    forgotPassFormState? <>
                      <strong style={{marginBottom: '5px', color: 'orange'}}>Forgot password!</strong>
                      {
                        user? <>
                          {
                            waitingForOTP? <>
                              <MessageBox color="orange">
                                <p><strong style={{fontWeight: "bold"}}>Waiting for Varification</strong><br/>Please check your email: <strong style={{fontWeight: "bold", color: "rgb(21, 169, 253)"}}>{user.email}</strong> for the OTP!</p>
                              </MessageBox>
                              <OtpInput onComplete={(val) => {
                                setIsLoading(true);
                                axios.post('/verify-forgot-pass-otp', {otp: val})
                                .then(res => {
                                  if(res.data.otpMatch) {
                                    addSnackBar("Reset password link was sent to your email", "success", 5);
                                  } else {
                                    addSnackBar("Invalid OTP!", "error", 5);
                                  }
                                  updatePasswordInputVal(null);
                                  setPasswordError('init');
                                  setForgotPassFormState(false);
                                  setWaitingForOTPState(false);
                                  setIsLoading(false);
                                })
                                .catch(err => {
                                  setIsLoading(false);
                                  alert("Error occured. Token Invalid or Expired!")
                                  setForgotPassFormState(false);
                                  setWaitingForOTPState(false);
                                  addSnackBar("Invalid OTP or OTP Expired!", "error", 5);
                                })
                              }} 
                              disabled={isLoading} />
                              {
                                otpExpiration && <ExpirationTimer expirationDate={otpExpiration.getTime()} onExpires={() => {
                                  setForgotPassFormState(false);
                                  setWaitingForOTPState(false);
                                }} />
                              }
                              <div className="back-to-login-form-area">
                                <i className="back-to-login-form" onClick={(e) => setForgotPassFormState(false)}><FontAwesomeIcon icon={["fas", "angle-left"]} size="sm" style={{marginRight: "5px"}}/>Go back to login</i>
                              </div>
                            </> : <>
                              <MessageBox color="orange">
                                <p>Later, You may ask to login to your email <strong style={{fontWeight: "bold", color: "rgb(21, 169, 253)"}}>{user.email}</strong> to view the OTP for verification!</p>
                              </MessageBox>
                              <Button 
                              color='white' 
                              bgColor='#15FD56' 
                              isLoading={isLoading}
                              onClick={(e) => {
                                setIsLoading(true);
                                axios.post('/send-otp', {
                                  ...user,
                                  nama: user.fullName
                                })
                                .then(res => {
                                  if(res.data.otpSendSuccess) {
                                    setOtpExpiration(new Date(res.data.otpExpiration));
                                    setWaitingForOTPState(true);
                                    addSnackBar("OTP Sent! Please check your email", "success", 5);
                                  } else throw "Faild to send OTP!";

                                  setIsLoading(false);
                                })
                                .catch(err => {
                                  setIsLoading(false);
                                  addSnackBar("Send OTP Faild! Try again", "error", 5);
                                })
                              }}>
                                <UseRipple />
                                Send OTP
                              </Button>
                              <div className="back-to-login-form-area">
                                <i className="back-to-login-form" onClick={(e) => setForgotPassFormState(false)}><FontAwesomeIcon icon={["fas", "angle-left"]} size="sm" style={{marginRight: "5px"}}/>Go back to login</i>
                              </div>
                            </>
                          }
                        </> : <>
                          <MessageBox color="#15FD56">
                            <p>Find your Account</p>
                          </MessageBox>
                          <div className="input-group" style={{marginTop: "20px"}}>
                            <IconInput 
                            disabled={isLoading}
                            error={!!(findAccountEmailFieldError && findAccountEmailFieldError !== "init")} 
                            value={findAccountEmailFieldVal !== null? findAccountEmailFieldVal : ''} 
                            onChange={(v) => updateFindAccountEmailFieldVal(v)}
                            placeholder='Email' type="email" 
                            icon={<FontAwesomeIcon icon={["fas", "envelope"]} />} 
                            flexible/>
                            { findAccountEmailFieldError && findAccountEmailFieldError !== "init" && <p className="error-text">{findAccountEmailFieldError}</p> }
                          </div>
                          <Button 
                          color='white' 
                          bgColor='#15FD56'
                          isLoading={isLoading} 
                          disabled={!!(findAccountEmailFieldError == "init" || findAccountEmailFieldError !== null)}
                          onClick={(e) => {
                            setIsLoading(true);
                            axios.post('/find-account', {email: findAccountEmailFieldVal})
                            .then(res => {
                              const { accountInfo } = res.data;
                              setUser({...accountInfo, fullName: accountInfo.name});
                              setIsLoading(false);
                            })
                            .catch(error => {
                              setIsLoading(false);
                              setFindAccountEmailFieldError("No Account found associated with the information you provided");
                            })
                          }}>
                            <UseRipple />
                            Find My Account
                          </Button>
                          <div className="back-to-login-form-area">
                            <i className="back-to-login-form" onClick={(e) => setForgotPassFormState(false)}><FontAwesomeIcon icon={["fas", "angle-left"]} size="sm" style={{marginRight: "5px"}}/>Go back to login</i>
                          </div>
                        </>
                      }
                      
                    </> : <>
                      {
                        !user && <>
                        {
                          loginError && <div className="input-group">
                            <MessageBox color="red">
                              <p>{loginError}</p>
                            </MessageBox>
                          </div>
                        }
                        <div className="input-group">
                          <IconInput 
                          disabled={isLoading}
                          error={!!(emailError && emailError !== "init")} 
                          placeholder='Email' 
                          type="email" 
                          icon={<FontAwesomeIcon icon={["fas", "envelope"]} />} 
                          flexible
                          value={emailInputVal !== null? emailInputVal : ''} 
                          onChange={(val) => updateEmailInputVal(val)}/>
                          { emailError && emailError !== "init" && <p className="error-text">{emailError}</p> }
                        </div>
                        </>
                      }
                      <div className="input-group">
                        <IconInput 
                        disabled={isLoading}
                        error={!!(passwordError && passwordError !== "init")} 
                        placeholder='Password' 
                        type="password" 
                        icon={<FontAwesomeIcon icon={["fas", "lock"]} />} 
                        flexible 
                        value={passwordInputVal !== null? passwordInputVal : ''} 
                        onChange={(val) => updatePasswordInputVal(val)}/>
                        { passwordError && passwordError !== "init" && <p className="error-text">{passwordError}</p> }
                      </div>
                      <Button 
                      isLoading={isLoading}
                      disabled={!((user && passwordError == null && passwordError !== 'init') || (emailError == null && emailError !== 'init' && passwordError == null && passwordError !== 'init'))}
                      color='white' 
                      bgColor='#15A9FD' 
                      onClick={(e) => {
                        setIsLoading(true);
                        axios.post('verify-login', {email: user? user.email : emailInputVal, password: passwordInputVal}) 
                        .then(res => {
                          const {login, userLoginInfo, error} = res.data;
                          if(login) return document.location.reload();
                          setUser({...userLoginInfo, fullName: userLoginInfo.name});
                          setPasswordError(error);
                          setIsLoading(false);
                        })
                        .catch(err => {
                          setIsLoading(false);
                          setLoginError("No Account found associated with the information you provided");
                        })
                      }}>
                        <UseRipple />
                        Log in
                      </Button>
                      <div className="forgot-pass-link-area">
                        <i className="forgot-pass-link" onClick={(e) => setForgotPassFormState(true)}>Forgot Password?</i>
                      </div>
                    </>
                  }
                </div>
              </LoginForm>
            </Container>
          </Layout>
        </div>
    </React.Fragment>
  );
}

function validateEmail(email: string): null | string {
  if(email.length === 0) return 'Email field can\'t be empty';
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!email.match(emailRegex)) {
    return 'Invalid email address';
  }

  return null;
}

export default App;
