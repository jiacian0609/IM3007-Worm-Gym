import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

    opacity: 0.4;
    background-image: url("/images/cover_2.jpg");
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
`

const Content = styled.div `
    position: relative;
    padding: 80px;

    width: 100%;
	height: 100%;

	margin: 0 auto;
	display: flex;
    flex-direction: column;
	align-items: center;
	justify-content: center;
`

const Title = styled.div `
    margin-bottom: 130px;

    font-family: 'NotoSansTC';
    font-style: normal;
    font-weight: 400;
    font-size: 180px;
    text-align: center;
    line-height: 180px;

    color: #0053B4;
`

const Box = styled.button `
    width: 730px;
    height: 850px;

    margin: 0 45px 0 45px;

    display: flex;
    flex-direction: column;
	align-items: center;
	justify-content: center;

    background-color: #90c9d1;
    border: none;
    border-radius: 100px;
    box-shadow: 5px 5px 4px 5px rgba(0, 0, 0, 0.2);

    cursor: pointer;

    &:hover {
        box-shadow: 10px 10px 5px 10px rgba(0, 0, 0, 0.2);
        background-color: #ACE3EB;
        border: solid 10px #ffffff;
    }
`

const Picture = styled.div `
    height: 350px;
    width: 350px;

    background-color: #ffffff;
    background-image: url(${props => props.img});
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: center;

    border-radius: 50%;
    display: inline-block;
`

const Text = styled.div `
    margin-top: 50px;
    
    font-family: 'NotoSansTC';
    font-style: normal;
    font-weight: 400;
    font-size: 60px;
    text-align: center;
`

const Submit = styled.button `
    padding: 10px 30px;
    margin-top: 80px;

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

export default function Home() {
    //JWT authentication
    if (window.localStorage.getItem('JWT') == null) {
        window.alert('請先登入')
        window.location.href = "/"
        return
    }

    const clickSubmit = function() {
        localStorage.clear();
        window.location.href = "/"
    }

    return (
    <Base>
        <Background />
        <Content>
            <Title>Worm Gym</Title>
            <div style={{display: 'flex', margin: '0 auto', width: '2450px'}}>
                <Link to={ `/inbody` } style={{ textDecoration: 'none' }}>
                    <Box color="#8294D3">
                        <Picture img="/images/data_icon.png"/>
                        <Text>INBODY 身體數據</Text>
                    </Box>
                </Link>
                <Link to={ `/record` } style={{ textDecoration: 'none' }}>
                    <Box color="#9FA2BC">
                        <Picture img="/images/schedule_icon.png"/>
                        <Text>健身紀錄</Text>
                    </Box>
                </Link>
                <Link to={ `/menu` } style={{ textDecoration: 'none' }}>
                    <Box color="#ACE3EB">
                        <Picture img="/images/sport_icon.png"/>
                        <Text>訓練菜單</Text>
                    </Box>
                </Link>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Submit onClick={() => clickSubmit()}>登出</Submit>
            </div>
        </Content>
    </Base>
    )
}