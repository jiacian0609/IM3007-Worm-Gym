import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Wrapper = styled.div `
    padding: 20px 80px;
    background-color: #fff;

    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Title = styled.div `
    margin-top: -20px;
    margin-right: 50px;

    font-family: 'NotoSansTC';
    font-style: normal;
    font-weight: 400;
    font-size: 80px;
    text-align: left;

    color: #0053B4;
`

const Home = styled.button `
    height: 80px;
    width: 80px;

    background-image: url("/images/home.png");
    background-color: inherit;
    background-repeat: no-repeat;

    border: none;

    cursor: pointer;

    &:hover{
        background-image: url("/images/home-hover.png");
    }
`

const Divider = styled.div `
    width: 100%;
    height: 30px;
    background-color: #003778;
`

const Function = styled.button `
    height: 80px;
    margin-top: 10px;
    padding: 0 20px;

    background-color: inherit;
    border: solid 3px #fff;

    font-family: 'NotoSansTC';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    text-align: center;
    line-height: 40px;

    color: #8c8c8c;

    &:hover {
        color: #0053B4;
    }

    ${(props) => props.active && `
        background-color: #0053B4;
        border-radius: 30px;
        color: #fff;

        &:hover {
            background-color: #fff;
            border: solid 3px #0053B4;
            color: #0053B4;
        }
    `}
`

const FunctionDivider = styled.div `
    width: 50px;
    margin: 20px;
    font-family: 'NotoSansTC';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    text-align: center;

    color: #8c8c8c;
`

export default function Header() {
    const path = useLocation().pathname;
    // console.log(path.slice(0, 4))
    return (
        <div style={{ position: 'fixed', top: '0', width: '100%'}}>
            <Wrapper>
                <div style={{display: 'flex'}}>
                <Title>Worm Gym</Title>
                <Function active={path === '/inbody'}>
                    <Link to="/inbody" style={{textDecoration: 'none', color: 'inherit'}}>
                        INBODY 身體數據
                    </Link>
                </Function>
                <FunctionDivider> | </FunctionDivider>
                <Function active={path === '/record'}>
                    <Link to="/record" style={{textDecoration: 'none', color: 'inherit'}}>
                        健身紀錄
                    </Link>
                </Function>
                <FunctionDivider> | </FunctionDivider>
                <Function active={path.slice(0, 5) === '/menu'}>
                    <Link to="/menu" style={{textDecoration: 'none', color: 'inherit'}}>
                        訓練菜單
                    </Link>
                </Function>
                </div>
                <Link to="/home">
                    <Home />
                </Link>
            </Wrapper>
            <Divider />
        </div>
    )
  }