import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled.div `
    width: 1000px;
    height: 220px;

    margin-left: 120px;
    align-items: center;

    font-family: 'Caramel';
    font-style: normal;
    font-weight: 400;
    font-size: 128px;
    line-height: 240px;
    text-align: left;

    color: #0053B4;
`

const Home = styled.button `
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
        <div style={{ display: 'flex' }}>
            <Title>Worm Gym</Title>
            <Link to="/home">
                <Home />
            </Link>
        </div>
    )
  }