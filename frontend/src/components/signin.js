import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'

const Base = styled.div `
    width: 2880px;
    height: 1594px;

    overflow: hidden;
    position: relative;
`

const Background = styled.img `
    width: 100%;
    height: 100%;

    content: ' ';
    display: block;
    position: absolute;
        left: 0;
        top: 0;

    opacity: 0.6;
    background-image: url("images/cover_1.png");
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
`

const Content = styled.div `
    position: relative;
`

const Title = styled.div `
    width: 1000px;
    height: 266px;

    padding: 150px 0 50px;
    margin: auto;

    font-family: 'Caramel';
    font-style: normal;
    font-weight: 400;
    font-size: 200px;
    line-height: 240px;
    text-align: center;

    color: #0053B4;
    // -webkit-text-stroke: 1px #2400FF;
`

const SignInBox = styled.div `
    width: 730px;
    height: 745px;

    padding: 80px 250px 80px 250px;
    margin: auto;

    background-color: #ffffff;
    border-radius: 100px;
`

const InputBar = styled.input `
    width: 700px;
    height: 100px;

    margin: 0 0 40px;
    padding: 10px;

    border: solid 5px #979797;
        border-radius: 20px;

    font-size: 60px;
`

const InputText = styled.div `
    width: 300px;
    height: 100px;

    margin: 0;

    font-family: 'Caramel';
    font-style: normal;
    font-size: 60px;
    text-align: left;

    color: #000000;
`

const Submit = styled.button `
    width: 730px;
    height: 100px;

    margin: 20px 0 40px;

    border: none;
    border-radius: 20px;
    background-color: #0053B4;
    
    font-family: 'Caramel';
    font-style: normal;
    font-size: 60px;
    color: #ffffff;
    text-align: center;
`

export default function SignIn() {
    function handleSignIn (username, password) {
        //console.log(username)
        axios.post("http://localhost:8000/login", {
            "username": username,
            "password": password
        })
        .then( (response) => {
            if (response.data === "Login successfully.") {
                window.location.href = "http://localhost:3000/home"
            } else {
				window.alert(response.data)
			}
        })
        .catch( (error) => console.log(error))
    }

    return (
    <Base>
        <Background src="images/cover_1.png" />
        <Content>
            <Title>Worm Gym</Title>
            <SignInBox>
                <InputText>會員帳號</InputText><br/>
                <InputBar id="username"/>
                <InputText>會員密碼</InputText><br/>
                <InputBar id="password"/>
                <Submit onClick={()=> handleSignIn(document.getElementById('username').value, document.getElementById('password').value)}>確認</Submit>
            </SignInBox>
        </Content>
    </Base>
  )
}