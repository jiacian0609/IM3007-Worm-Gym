import { React, useState, useEffect } from 'react';
import styled from 'styled-components';

const Base = styled.div `
    width: 2880px;
    height: 1594px;

    background-position: right;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("images/cover_1.png");
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

    color: #89F500;

    -webkit-text-stroke: 1px #2400FF;
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
    background-color: #35D11B;
    
    font-family: 'Caramel';
    font-style: normal;
    font-size: 60px;
    text-align: center;
`

export default function SignIn() {
  return (
    <Base>
        <Title>Worm Gym</Title>
        <SignInBox>
            <InputText>會員帳號</InputText><br/>
            <InputBar />
            <InputText>會員密碼</InputText><br/>
            <InputBar />
            <Submit>確認</Submit>
        </SignInBox>
    </Base>
  )
}