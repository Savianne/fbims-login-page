import styled from "styled-components";
import Button from "./Button";
import { InputContainer } from "./OTPField";

export const Container = styled.div`
    position: relative;
    display: flex;
    flex: 0 1 800px;
    height: 480px;
    -webkit-box-shadow: 14px 3px 73px 11px rgba(240,240,240,0.61);
    -moz-box-shadow: 14px 3px 73px 11px rgba(240,240,240,0.61);
    box-shadow: 14px 3px 73px 11px rgba(240,240,240,0.61);
    z-index: 5;

    .loading-indicator-area {
        display: flex;
        width: 100%;
        height: 5px;
        position: absolute;
        top: -5px;
        background-color: transparent;
    }
`;

export const BGImage = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(assets/images/organizations.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.3;
`;

export const LoginForm = styled.div`
    position relative;
    display: flex;
    align-content: flex-start;
    width: 350px;
    height: 100%;
    background-color: white;
    flex-wrap: wrap;
    -webkit-box-shadow: 4px 5px 5px -1px  rgba(140,140,140,1);
    -moz-box-shadow: 4px 5px 5px -1px  rgba(140,140,140,1);
    box-shadow: 4px 5px 5px -1px  rgba(140,140,140,1);

    .form-group {
        display: flex;
        flex: 0 1 100%;
        flex-wrap: wrap;
        padding: 0 40px;
        height: fit-content;
        justify-content: center;
        margin: 20px 0 20px 0;
    }
 
    .user-info-group {
        display: flex;
        flex: 0 1 100%;
        height: fin-content;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .user-info-group .user-fullname,
    .user-info-group .user-email {
        flex: 0 1 100%;
        text-align: center;
    }

    .user-info-group .user-email {
        color: gray;
        font-size: 13px;
        font-style: italic;
    }

    .user-info-group .not-you-link {
        font-size: 16px;
        color: #15A9FD;
        font-style: normal;
        cursor: pointer;
    }

    .user-info-group .user-fullname {
        font-size: 18px;
        font-weight: 600;
    }

    .form-group .input-group {
        display: flex;
        flex: 0 1 100%;
        height: fit-content;
        margin-bottom: 25px;
        flex-wrap: wrap;
    }

    .form-group .input-group .error-text {
        flex: 0 1 100%;
        font-size: 12px;
        margin-top: 3px;
        font-weight: 600;
        color: #FD1515;
    }
    
    .form-group ${InputContainer} {
        margin: 15px 0;
    }
    .form-group ${Button} {
        margin-top: 10px;
        margin-left: auto;
    }

    .form-group .forgot-pass-link-area,
    .form-group .back-to-login-form-area {
        display: flex;
        flex: 0 1 100%;
        margin-top: 30px;
        cursor: pointer;
    }

    .form-group .forgot-pass-link-area .forgot-pass-link,
    .form-group .back-to-login-form-area .back-to-login-form {
        margin-left: auto;
        font-weight: 600;
        color: rgba(157, 195, 230, 1);
    }
`;

export const RegistrationPannel = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 0 50px;
    flex: 1;
    height: 100%;
    overflow: hidden;

    .bg-image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: yellow;
        background-image: url(assets/images/organizations.jpg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .cover-effect {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(34 42 53 / 75%);
        /* background-color: rgba(34, 42, 53, 0.41); */
    }

    .register-btn-area {
        display: flex;
        flex: 0 1 100%;
        flex-wrap: wrap;
        color: white;
        z-index: 5;
        height: fit-content;
        /* margin-top: -10px; */
    }

    .register-btn-area h1 {
        display: flex;
        flex: 0 1 100%;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
    }
`;

const Layout = styled.div`
    display: flex;
    position: relative;
    flex: 0 1 100%;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #cbc8c81f;
    font-family: AssistantVariableFontwght;
    line-height: 1.5;
    letter-spacing: 0.00938em;
`;

export default Layout;