import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import '../css/menu.css';

import Header from '../components/Header';

const Base = styled.div `
    width: 2880px;
    height: 1594px;

    // padding: 0 150px 0 150px;

    overflow: hidden;
    position: relative;
`

const Background = styled.img `
    width: 2880px;
    height: 1594px;

    content: ' ';
    display: block;
    position: absolute;
        left: 0;
        top: 0;
        z-index: -1;

    opacity: 0.8;
    background-image: url("/images/cover_3.png");
    background-repeat: no-repeat;
    // background-position: 50% 0;
    background-size: cover;
`

const Content = styled.div `
    position: relative;
`

const Bar = styled.div ` 
    width: 1650;
    height: 120px;

    padding: 50px 1015px 50px 1015px;

    background: #242222;
    display: flex;
`

const MenuText = styled.div `
    margin: 0 50px 0 0;

    font-family: 'Charmonman';
    font-style: normal;
    font-weight: 400;
    font-size: 64px;
    line-height: 122px;

    color: #FFFFFF;
`

const Submit = styled.button `
    width: 140px;
    height: 80px;

    padding: 2px;
    margin: 20px 0 20px;

    background: #35D11B;
    border: 3px solid #35D11B;
    border-radius: 8px;

    font-style: normal;
    font-weight: 400;
    font-size: 40px;
`

const Row = styled.div `
    width: auto;
    height: 850px;

    padding: 115px 0 115px;

    display: flex;
    justify-content: center;
`

const Box = styled.button `
    width: 730px;
    height: 850px;

    padding: 170px 80px 170px 80px;
    margin: 0 70px 0 70px;

    background: rgba(0, 235, 250, 0.65);
    border: solid 20px rgba(252, 255, 121, 0.58);
    border-radius: 100px;
`

const Year = styled.div `
    font-family: 'Charmonman';
    font-style: normal;
    font-weight: 400;
    font-size: 80px;
    // line-height: 152px;

    color: #000000;
`

const Month = styled.div `
    font-family: 'Charmonman';
    font-style: normal;
    font-weight: 400;
    font-size: 160px;
    line-height: 304px;

    color: #000000;
`

const RateText = styled.span `
    font-family: 'Charmonman';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 76px;
    /* identical to box height */

    color: #000000;
`

const RateNum = styled.span `
    font-family: 'Charmonman';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 76px;
    /* identical to box height */

    color: #0053B4;
`

function MonthButton(data) {
    console.log(data.data);
    return (
        <Box>
            <Year>{ data.data.year }</Year>
            <Month>{ data.data.month }</Month>
            <RateText>達成率：</RateText>
            <RateNum>{ data.data.finish_rate }</RateNum>
        </Box>
    );
};


export default function Menu() {
    const [data, setData] = useState();

	useEffect(() => {
		axios.get("http://localhost:8000/finish-rate", {
			headers: {
			  'Authorization': `${localStorage.getItem('JWT')}`
			}
		})
		.then( (response) => setData(response.data))
		.catch( (error) => console.log(error))
	}, []);

    console.log('data: ', data);

    const selectMonth = function(month) {
        window.location.href = "./menu/" + month;
    };

    return (
        <Base>
            <Header />
            <Background />
            <Content>
                <Bar>
                    <MenuText>訓練菜單</MenuText>
                    <div className="month">
                        <select className="month-selector" id="month" defaultValue="2022-05">
                            {data?.map(items => <option value={items.year + '-' + items.month} key={items.year + items.month}>{items.year + '-' + items.month}</option>)}
                        </select>
                    </div>
                    <Submit onClick={() => selectMonth(document.getElementById("month").value)}>確認</Submit>
                </Bar>
                <Row>
                    {data?.map(items => <MonthButton data={items} key={items.year + items.month}/>)}
                </Row>
            </Content>
        </Base>
    )
}

// {data.map(items => <option value={items.year + '-0' + items.month} key={items.year + items.month}>{items.year + '-0' + items.month}</option>)}
// {data.map(items => <MonthButton data={items} key={items.year + items.month}/>)}