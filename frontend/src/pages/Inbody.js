import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Table, Tag, Space } from 'antd';

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
    height: 536px;

    content: ' ';
    display: block;
    position: absolute;
        left: 0;
        top: 0;
        z-index: -1;

    opacity: 0.8;
    background-image: url("./images/vector_3.png");
    background-repeat: no-repeat;
    // background-position: 50% 0;
    background-size: cover;
`

const Content = styled.div `
    position: relative;
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

const SelectBox = styled.div `
    width: 300px;
    height: 46px;

    padding: 10px;
    margin: 26px 50px 26px 0;

    border: 4px solid #000000;

    display: flex;
`

const SelectText = styled.div `
    width: 85%;

    font-family: 'Fira Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    text-align: center;
    line-height: 48px;

    color: #000000;
`

const SelectButton = styled.button `
    background-color: inherit;
    border: none;

    margin: 0;
    padding: 0;

    // font-family: 'Fira Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;

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

const ScoreBox = styled.div ` 
    width: 470px;
    height: 200px;

    margin: 80px 0 0 400px;
    padding: 50px 100px 50px 100px;

    border-radius: 50px;
    background: #ffd9ed;
    display: flex;
    align-items: center;
`

const Info = styled.div `
    width: 900px;
    height: 200px;

    margin: 88px 0 0 100px;
    font-size: 55px;
`

//get API的模板，給你參考，記得import axios，加油:D
/*
axios.get("http://localhost:8000/inbody_record", {
    headers: {
      'Authorization': `${localStorage.getItem('JWT')}`
    }
})
.then( (response) => {
    console.log(response)
})
.catch( (error) => console.log(error))
*/

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Cash Assets',
      className: 'column-money',
      dataIndex: 'money',
      align: 'right',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      money: '￥300,000.00',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      money: '￥1,256,000.00',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
  ];

export default function Inbody() {
  return (
    <Base>
      <Header />
        <Background />
        <Content>
            <Bar>
                <InbodyText>Inbody 身體數據</InbodyText>
                <Link to={ `/menu/2022-05` } style={{ textDecoration: 'none' }}>
                    <SelectBox>
                        <SelectText>2022.05</SelectText>
                        <SelectButton>V</SelectButton>
                    </SelectBox>
                </Link>
                <Submit>確認</Submit>
            </Bar>
            <div style={{ display: 'flex' }}>
                <ScoreBox>
                    <span style={{ fontSize: '120px', marginRight: '45px' }}>65</span>
                    <span style={{ fontSize: '80px' }}> / 100 分</span>
                </ScoreBox>
                <Info>
                    身高：176.2 cm<br/>
                    性別：男<br/>
                    年齡：33<br/>
                    檢測時間：2022.04.21  10:23
                </Info>
            </div>
        </Content>
        <Table
    columns={columns}
    dataSource={data}
    bordered
    title={() => 'Header'}
    footer={() => 'Footer'}
  />
    </Base>
  )
}