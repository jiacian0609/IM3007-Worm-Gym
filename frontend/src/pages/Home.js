import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Base = styled.div `
    width: 100%;
    height: 100%;

    overflow: hidden;
    position: absolute;
`

const Background = styled.img `
    width: 100%;
    height: 100%;

    content: ' ';
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
`

const Title = styled.div `
    width: 1200px;
    height: 270px;

    margin: 100px auto 100px;

    background-image: url("/images/WormGym.png");
    background-repeat: no-repeat;
    background-size: contain;
`

const Box = styled.button `
    width: 730px;
    height: 850px;

    padding: 180px 80px 180px 80px;
    margin: 0 45px 0 45px;

    background-color: ${props => props.color};
    border: solid 5px #ffffff;
    border-radius: 100px;
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
    font-family: 'Caramel';
    font-style: normal;
    font-weight: 400;
    font-size: 60px;
    line-height: 240px;
    text-align: center;
`

const Submit = styled.button `
    width: 140px;
    height: 80px;

    padding: 2px;
    margin: 50px 0 20px;

    background: #35D11B;
    border: 3px solid #35D11B;
    border-radius: 8px;

    font-style: normal;
    font-weight: 400;
    font-size: 40px;
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
            <Title />
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