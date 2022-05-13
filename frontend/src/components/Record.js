import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import '../css/record.css';

const Base = styled.div `
    width: 100%;
    height: 100%;
    position: absolute;
`

const Content = styled.div `
    position: relative;
`

const Title = styled.div `
    width: 100%;
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
    width: 150px;
    height: 150px;

    margin: 0 auto;
    border-radius: 50%;

    background-color: #27CE24;
    background-image: url("${props => props.src}");
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
`

const Text = styled.div `
    width: 300px;
    height: 40px;
    magin: 20px 0 0 0;
    font-size: 34px;
    text-align: center;
`

const Row = styled.div `
    width: 1100px;
    height: 190px;
    margin: 40px 0;
    display: flex;
    justify-content: space-around;
`

function Task(items) {
    console.log(items)

    let url;
    if (items.items.id < 10)
        url = '../images/gym_0' + items.items.id + '.png';
    else
        url = '../images/gym_' + items.items.id + '.png';

    return (
        <div style={{ display: 'block', alignItems: 'center' }}>
            <Img src={ url } />
            <Text>{ items.items.name }</Text>
        </div>
    );
};

// choose day
/*
<select className="shipment__item-selector" defaultValue="taiwan">
    <option value="taiwan">臺灣及離島</option>
</select>*/

export default function Record() {
    let tasks = [{id: 1, name: '橢圓機'}, {id: 2, name: '跑步機'}, {id: 3, name: '飛輪車'}, {id: 4, name: '雙槓抬腿機'},
        {id: 5, name: '蝴蝶夾胸機'}, {id: 6, name: '直立式腳踏車'}, {id: 7, name: '臥式腳踏車'}, {id: 8, name: '划船機'},
        {id: 9, name: '滾輪'}, {id: 10, name: '夾胸器'}, {id: 11, name: '啞鈴彎舉'}, {id: 12, name: '負重深蹲'},
        {id: 13, name: '側腹旋'}, {id: 14, name: '腿推機'}, {id: 15, name: '滑輪下拉機'}, {id: 16, name: '啞鈴肩推'},
        {id: 17, name: '啞鈴反握手腕彎舉'}, {id: 18, name: '舉槓臥推'}, {id: 19, name: '捲腹'}, {id: 20, name: '引體向上'}];

    const [weight, setWeight] = useState();
    const [set, setSet] = useState();
    const [time, setTime] = useState();

    return (
    <Base>
        <Content>
            <Title>Worm Gym</Title>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'block', alignItems: 'center' }}>
                    <StyledCalendar></StyledCalendar>
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'block' }}>
                        <Row>{tasks.slice(0, 4)?.map(items => <Task items={ items } key={ items.id }/>)}</Row>
                        <Row>{tasks.slice(4, 8)?.map(items => <Task items={ items } key={ items.id }/>)}</Row>
                        <Row>{tasks.slice(8, 12)?.map(items => <Task items={ items } key={ items.id }/>)}</Row>
                        <Row>{tasks.slice(12, 16)?.map(items => <Task items={ items } key={ items.id }/>)}</Row>
                        <Row>{tasks.slice(16, 20)?.map(items => <Task items={ items } key={ items.id }/>)}</Row>
                    </div>
                    <div className="form">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className='planTitle'>今日計畫</div>
                            <div className="day">
                                <select className="day-selector" defaultValue="day1">
                                    <option value="day1">Day 1</option>
                                    <option value="day2">Day 2</option>
                                    <option value="day3">Day 3</option>
                                    <option value="day4">Day 4</option>
                                    <option value="free">Free</option>
                                </select>
                            </div>
                        </div>
                        <div className="form__field">
                            <div className="form__field-name">重量</div>
                            <input
                                className="form__field-input"
                                value={ weight }
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                        <div className="form__field">
                            <div className="form__field-name">組數</div>
                            <input
                                className="form__field-input"
                                value={ set }
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                        <div className="form__field">
                            <div className="form__field-name">次數</div>
                            <input
                                className="form__field-input"
                                value={ time }
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    </Base>
    );
}