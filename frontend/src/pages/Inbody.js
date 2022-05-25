import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import jwt_decode from "jwt-decode";

const Base = styled.div `
  width: 100%;
  height: 100%;
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

  // opacity: 0.8;
  // background-image: url("./images/cover_4.png");
  // background-repeat: no-repeat;
  // background-position: 50% 0;
  // background-size: cover;
`

const MonthSelector = styled.select `
  height: 100px;
  width: 300px;
  
  position: fixed;
    left: 150px;
    top: 300px;

  padding: 10px 30px;
  font-size: 50px;

  border: none;
  border-radius: 50px;
  background: #ACE3EB;
  display: flex;
  align-items: center;

  cursor: pointer;
`

const Desc = styled.div `
  width: 615px;

  padding: 50px;

  position: fixed;
    left: 150px;
    top: 500px;

  background-color: #f3f3f3;
  border-radius: 30px;

  font-family: 'PingFangTc';
  font-size: 45px;
`

const StyledInbodyContent = styled.div `
  height: 3000px;
  width: 1800px;

  margin: 30px 0 0 600px;

  background-image: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
`

function InbodyContent(props) {
  console.log(props);
  let url = '/images/inbody/' + props.uid + '_' + props.month + '.png';
  return (
    <div style={{ display: 'flex'}}>
      <StyledInbodyContent src={ url } />
    </div>
  );
}

export default function Inbody() {
  try { 
    var payload = jwt_decode(window.localStorage.getItem('JWT'));
    // console.log(payload)
    var user_id = payload.Uid;
  }
  catch (error) {
    console.log(error)
    window.alert('請先登入')
		window.location.href = "/"
  }

  let months = [];
  if (user_id === 1)
    months = ['2022-03', '2022-04'];
  else if (user_id === 2)
    months = ['2022-04'];
  else
    months = ['No Record'];

  const [month, setMonth] = useState(months[0]);
  useEffect(() => {}, [month]);

  return (
    <Base>
      <Header />
      <Background />
      <div style={{ marginTop: '170px', paddingTop: '80px', display: 'flex', justifyContent: 'center' }}>
        <MonthSelector
          id="month"
          defaultValue={ months[0] }
          onChange={e => setMonth(e.target.value)}
        >
          { months.map(items => <option value={ items } key={ items }>{ items }</option>) }
        </MonthSelector>
        <Desc>透過 Inbody 數據了解身體體脂率、肌肉量、基礎代謝率，全方位解析身體組成。選擇月份查看身體組成變化，以檢視自己的健身成效吧！</Desc>
        <InbodyContent uid={user_id} month={month} />
      </div>
    </Base>
  )
}