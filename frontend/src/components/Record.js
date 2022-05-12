import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import '../css/record.css';

const Base = styled.div `
    width: 100%;
    height: 100%;

    overflow: hidden;
    position: absolute;
`

const Content = styled.div `
    position: relative;
`

const Title = styled.div `
    width: 1000px;
    height: 266px;

    padding: 20px 0 10px 150px;
    margin: 0 0 0 43px;

    font-family: 'Caramel';
    font-style: normal;
    font-weight: 400;
    font-size: 128px;
    line-height: 240px;
    text-align: left;

    color: #0053B4;
`

const StyledCalendar = styled.div `
    width: 800px;
    height: 1000px;

    margin: 50px 100px 50px 200px;
    background-color: #e2e2e2;
`

const Img = styled.div `
    width: 200px;
    height: 200px;

    border-radius: 50%;

    background-color: #27CE24;
    background-image: url("${props => props.src}");
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
`

const Text = styled.div `
    width: 200px;
    height: 40px;
    magin: 20px 0 0 0;
    font-size: 34px;
    text-align: center;
`

const Row = styled.div `
    width: 1400px;
    height: 240px;
    margin: 50px;
    display: flex;
    justify-content: space-around;
`

function Task(items) {
    console.log(items)

    let url;
    if (items.items < 10)
        url = '../images/gym_0' + items.items + '.png';
    else
        url = '../images/gym_' + items.items + '.png';

    return (
        <div style={{ display: 'block' }}>
            <Img src={ url } />
            <Text>name
            </Text>
        </div>
    );
};

// choose day
/*
<select className="shipment__item-selector" defaultValue="taiwan">
    <option value="taiwan">臺灣及離島</option>
</select>*/

export default function Record() {
    return (
    <Base>
        <Content>
            <Title>Worm Gym</Title>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <StyledCalendar></StyledCalendar>
                <div style={{display: 'inline', height: '1060px'}}>
                    <div className='planTitle'>今日計畫</div>
                    <Row>{[1, 2, 3, 4]?.map(items => <Task items={ items } key={ items }/>)}</Row>
                    <Row>{[5, 6, 7, 8]?.map(items => <Task items={ items } key={ items }/>)}</Row>
                    <Row>{[9, 10, 11, 12]?.map(items => <Task items={ items } key={ items }/>)}</Row>
                </div>
            </div>
        </Content>
    </Base>
    );
}