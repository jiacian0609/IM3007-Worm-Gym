import styled from 'styled-components';

const Title = styled.div `
    width: 1000px;
    height: 250px;

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

const Home = styled.a `
    height: 80px;
    width: 80px;

    position: absolute;
        top: 80px;
        right: 80px;

    background-image: url("/images/home.png");
    background-color: inherit;
    background-repeat: no-repeat;

    border: none;
`

export default function Header() {
    return (
        <div>
            <Title>Worm Gym</Title>
            <Home href="/home"/>
        </div>
    )
  }