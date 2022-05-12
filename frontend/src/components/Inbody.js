import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Table, Tag, Space } from 'antd';

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

    opacity: 0.8;
    background-image: url("images/vector_3.png");
    background-repeat: no-repeat;
    // background-position: 50% 0;
    background-size: cover;
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

const rows = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

export default function Inbody() {
  return (
    <Base>
        <Background />
        <Content>
            <Title>Worm Gym</Title>
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
            <Table rows={rows} dataSource={data} />
        </Content>
    </Base>
  )
}