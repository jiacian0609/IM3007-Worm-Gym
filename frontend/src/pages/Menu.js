import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Header from '../components/Header';

const Base = styled.div `
    width: 100%;
    height: 100%;
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
        z-index: -1;

    opacity: 0.8;
    background-image: url("/images/cover_3.png");
    background-repeat: no-repeat;
    // background-position: 50% 0;
    background-size: cover;
`

const Row = styled.div `
// height: '100%', marginTop: '170px', paddingTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center'
    height: 100%;
    width: 100%;
    padding-top: 170px;

    display: flex;
    align-items: center;
    justify-content: center;
`

const Box = styled.button `
    width: 730px;
    height: 850px;

    padding: 170px 80px 170px 80px;
    margin: 0 70px 0 70px;

    background-color: rgba(144, 201, 209, 0.5);
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

const Year = styled.div `
    font-family: 'NotoSansTC';
    font-style: normal;
    font-weight: 400;
    font-size: 80px;
    // line-height: 152px;

    color: #000000;
`

const Month = styled.div `
    font-family: 'NotoSansTC';
    font-style: normal;
    font-weight: 400;
    font-size: 160px;
    line-height: 304px;

    color: #000000;
`

const RateText = styled.span `
    font-family: 'NotoSansTC';
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
    // console.log(data.data);
    return (
        <Box onClick={() => data.selectMonth(data.data.year + '-' + data.data.month + '-01')}>
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
		//JWT authentication
		if (window.localStorage.getItem('JWT') == null) {
			window.alert('請先登入')
			window.location.href = "/"
		}
	}, [])

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
        console.log(month)
        window.location.href = "./menu/" + month;
    };

    return (
        <Base>
            <Header />
            <Background />
            <Row>
                {data?.map(items => 
                    <MonthButton
                        data={items}
                        selectMonth={selectMonth}
                        key={items.year + items.month}
                    />
                )}
            </Row>
        </Base>
    )
}

// {data.map(items => <option value={items.year + '-0' + items.month} key={items.year + items.month}>{items.year + '-0' + items.month}</option>)}
// {data.map(items => <MonthButton data={items} key={items.year + items.month}/>)}