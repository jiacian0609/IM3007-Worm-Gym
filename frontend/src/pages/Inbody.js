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
`

const StyledInbodyContent = styled.div `
  height: 3000px;
  width: 1800px;

  margin: 30px auto;

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
      <div style={{ marginTop: '170px', paddingTop: '80px' }}>
        <MonthSelector
          id="month"
          defaultValue={ months[0] }
          onChange={e => setMonth(e.target.value)}
        >
          { months.map(items => <option value={ items } key={ items }>{ items }</option>) }
        </MonthSelector>
        <InbodyContent uid={user_id} month={month} />
      </div>
    </Base>
  )
}