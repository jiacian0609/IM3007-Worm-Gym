import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Base = styled.div `
	width: 100%;
	height: 100%;

	position: absolute;
`

const Background = styled.img `
	width: 100%;
	height: 100%;

	display: block;
	position: absolute;
		left: 0;
		top: 0;
		z-index: -1;

    opacity: 0.6;
    background-image: url("./images/cover_1.png");
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
`

const Content = styled.div `
	width: 50%;
	height: 100%;

	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Title = styled.div `
	margin-bottom: 100px;

	font-family: 'NotoSansTC';
	font-style: normal;
	font-weight: 400;
	font-size: 180px;
	text-align: center;
	line-height: 180px;

	color: #0053B4;
`

const SignInBox = styled.div `
	width: 100%;
	padding: 80px 0;

	background-color: #ffffff;
	border-radius: 100px;
	box-shadow: 10px 10px 5px 10px rgba(0, 0, 0, 0.2);

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const InputBar = styled.input `
	width: 100%;
	height: 100px;

	margin: 0 0 40px;
	padding: 30px 20px;

	border: solid 5px #979797;
	border-radius: 20px;

	font-family: 'NotoSansTC';
	font-size: 40px;
`

const InputText = styled.div `
	width: 300px;
	height: 100px;

	margin: 0;

	font-family: 'PingFangTC';
	font-style: normal;
	font-size: 60px;
	text-align: left;

	color: #000000;
`

const Submit = styled.button `
	padding: 10px 30px;

	border: none;
	border-radius: 20px;
	background-color: #0053B4;
	
	font-family: 'PingFangTC';
	font-style: normal;
	font-size: 40px;
	color: #ffffff;
	text-align: center;

	cursor: pointer;

	&:hover {
		background-color: #c7e0fc;
		color: #0053B4;
		box-shadow: 2px 2px 1px 2px rgba(0, 0, 0, 0.2);
	}
`

export default function SignIn() {
    function handleSignIn (username, password) {
        //console.log(username)
        axios.post("http://localhost:8000/login", {
            "username": username,
            "password": password
        })
        .then( (response) => {
			window.localStorage.setItem('JWT', response.data.JWT)
            window.location.href = "/home"
		})
		.catch( (error) => {
			if(error.response.data === 'Username does not exist.')
				window.alert('????????????????????????')
			else if(error.response.data === 'Password is wrong :(')
				window.alert('?????????????????????')
			else window.alert(error.response.data)
		})
	}

	return (
	<Base>
		<Background src="/images/cover_1.png" />
		<Content>
			<div>
				<Title>Worm Gym</Title>
				<SignInBox>
					<div style={{ width: '60%'}}>
						<div>
							<InputText>????????????</InputText><br/>
							<InputBar id="username"/>
						</div>
						<div>
							<InputText>????????????</InputText><br/>
							<InputBar id="password" type="password"/>
						</div>
					</div>
					<Submit onClick={()=> handleSignIn(document.getElementById('username').value, document.getElementById('password').value)}>??????</Submit>
				</SignInBox>
			</div>
		</Content>
	</Base>
  )
}