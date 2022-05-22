import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Table, Tag, Space } from 'antd';

import "../css/inbody.css";
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

    opacity: 0.8;
    background-image: url("./images/cover_4.png");
    background-repeat: no-repeat;
    // background-position: 50% 0;
    background-size: cover;
`

const Bar = styled.div ` 
    width: 1025px;
    height: 120px;

    margin: 0 0 0 100px;
    padding: 50px 100px 50px 100px;

    border-radius: 50px;
    background: #ACE3EB;
    display: flex;
    align-items: center;
`

const InbodyText = styled.div `
    margin: 0 50px 0 0;

    font-family: 'Charmonman';
    font-style: normal;
    font-weight: 400;
    font-size: 64px;
    line-height: 122px;

    color: #000000;
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
  useEffect(() => {
  }, [month]);

  return (
    <Base>
      <Header />
      <Background />
      <Bar>
          <InbodyText>Inbody 身體數據</InbodyText>
          <div className="month">
              <select className="month-selector" id="month" defaultValue={ months[0] }>
                  { months.map(items => <option value={ items } key={ items }>{ items }</option>) }
              </select>
          </div>
          <Submit onClick={() => setMonth(document.getElementById("month").value)}>確認</Submit>
      </Bar>
      <InbodyContent uid={user_id} month={month} />
    </Base>
  )
}