import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled.div `
    width: 800px;
    height: 200px;

    margin-left: 120px;
    margin-top: 80px;
    align-items: center;

    background-image: url("/images/WormGym.png");
    background-repeat: no-repeat;
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

    cursor: pointer;
`

export default function Header() {
    return (
        <div style={{ display: 'flex' }}>
            <Title />
            <Link to="/home">
                <Home />
            </Link>
        </div>
    )
  }