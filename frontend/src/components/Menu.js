import { React, useState, useEffect } from 'react';
import styled from 'styled-components';

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

    opacity: 0.8;
    background-image: url("images/cover_3.png");
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

const SelectBox = styled.div `
    width: 300px;
    height: 46px;

    padding: 10px;
    margin: 26px 50px 26px 0;

    border: 4px solid #FFFFFF;

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

    color: #DFDFDF;
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

function MonthButton() {
    return (
        <Box>
            <Year>2022</Year>
            <Month>02</Month>
            <RateText>達成率：</RateText>
            <RateNum>100%</RateNum>
        </Box>
    );
};


export default function Home() {
  return (
    <Base>
        <Background />
        <Content>
            <Title>Worm Gym</Title>
            <Bar>
                <MenuText>訓練菜單</MenuText>
                <SelectBox>
                    <SelectText>2022.05</SelectText>
                    <SelectButton>V</SelectButton>
                </SelectBox>
                <Submit>確認</Submit>
            </Bar>
            <Row>
                <MonthButton />
                <MonthButton />
                <MonthButton />
            </Row>
        </Content>
    </Base>
  )
}