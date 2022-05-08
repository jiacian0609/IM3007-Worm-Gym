import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'sassy-datepicker';
import axios from 'axios';

const Base = styled.div `
    width: 2880px;
    height: 1594px;

    // padding: 0 150px 0 150px;

    overflow: hidden;
    position: relative;
`

const Content = styled.div `
    position: relative;
`

const Title = styled.div `
    width: 700px;
    height: 180px;

    padding: 0 0 10px 40px;
    margin: 0 0 30px 43px;

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
    height: 40px;

    padding: 50px 1015px 50px 1015px;

    background: #242222;
    display: flex;
`

const StyledCalendar = styled.div `
    width: 500px;
    height 500px;

    margin: 200px;
`

const Img = styled.img `
    width: 200px;
    height: 200px;

    border-radius: 50%;
    background-color: #27CE24;
`

const Text = styled.span `
    width: 300px;
    height: 100px;

    margin: 35px;

    font-size: 35px;
    text-align: left;
`

function Task(items) {
    console.log(items)
    return (
        <div style={{ display: 'flex', margin: '50px' }}>
            <Img src='../images/gym_01.png' />
            <Text>
                啞鈴肩推<br/>
                --------------<br/>
                重量：{ items.items.weight } KG<br/>
                次數：{ items.items.reps } 次<br/>
                組數：{ items.items.sets } 組 
            </Text>
        </div>
    );
};

// https://github.com/sassy-labs/datepicker?ref=reactjsexample.com
// https://reactjsexample.com/beautiful-minimal-and-accessible-date-picker-for-react/
function Calendar() {
    const onChange = (date) => {
      console.log(date.toString());
    };
  
    return (
      <DatePicker onChange={onChange} />
    );
};

export default function MonthlyMenu() {
    const time = useParams().month;

    const [year, setYear] = useState(time.split("-")[0])
    const [month, setMonth] = useState(time.split("-")[1])
    const [week, setWeek] = useState(time.split("-")[2])

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/menu/" + year + "-" + month + "-" + week)
        .then( (response) => setData(response.data))
        .catch( (error) => console.log(error))
    }, [year, month, week])
    //console.log(data)   
    return (
      <Base>
        <Content>
            <Title>Worm Gym</Title>
            <Bar />
            <div style={{display: 'flex' }}>
                <StyledCalendar> 
                    <Calendar />
                </StyledCalendar>
                {data?.map(items => <Task items={ items } key={ items.program_id }/>)}
            </div>
            <Bar />
        </Content>
      </Base>
    )
}