import { React, useState, useEffect } from 'react';
import styled from 'styled-components';

const Base = styled.div `
    width: 2580px;
    height: 1594px;

    padding: 0 150px 0 150px;

    background-position: right;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("images/cover_2.jpg");

    display: inline-block;
    text-align: center;
`

const Title = styled.div `
    width: 1000px;
    height: 266px;

    padding: 150px 0 120px;
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

const Box = styled.button `
    width: 730px;
    height: 850px;

    padding: 180px 80px 180px 80px;
    margin: 0 45px 0 45px;

    background-color: ${props => props.color};
    border: none;
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


export default function Home() {
  return (
    <Base>
        <Title>Worm Gym</Title>
        <Box color="#8294D3">
            <Picture img="images/data_icon.png"/>
            <Text>INBODY 身體數據</Text>
        </Box>
        <Box color="#9FA2BC">
            <Picture img="images/schedule_icon.png"/>
            <Text>健身紀錄</Text>
        </Box>
        <Box color="#ACE3EB">
            <Picture img="images/sport_icon.png"/>
            <Text>訓練菜單</Text>
        </Box>
    </Base>
  )
}