import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'sassy-datepicker';
import axios from 'axios';

import Header from '../components/Header';

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

const Bar = styled.div ` 
    width: 1650;
    height: 40px;

    padding: 50px 1015px 50px 1015px;

    background: #242222;
    display: flex;
`

const StyledCalendar = styled.div `
    width: 600px;
    height 500px;

    margin: 200px;
`

const Img = styled.span `
    width: 200px;
    height: 200px;

    border-radius: 50%;

    background-color: #27CE24;
    background-image: url("${props => props.src}");
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
`

const Text = styled.span `
    width: 300px;
    height: 200px;

    margin: 0 0 0 35px;

    font-size: 34px;
    text-align: left;
`

const Row = styled.div `
    width: 1400px;
    height: 300px;
    margin: 20px;
    display: flex;
`

function Task(items) {
    console.log(items)

    let url;
    if (items.items.equip_id < 10)
        url = '../images/gym_0' + items.items.equip_id + '.png';
    else
        url = '../images/gym_' + items.items.equip_id + '.png';

    return (
        <div style={{ display: 'flex', margin: '50px 200px 50px 50px' }}>
            <Img src={ url } />
            <Text>
                { items.items.program_id }<br/>
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
        <Header />
        <Content>
            <Bar />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <StyledCalendar> 
                    <Calendar />
                </StyledCalendar>
                <div style={{display: 'inline', height: '1060px'}}>
                    <Row>{data.slice(0, 2)?.map(items => <Task items={ items } key={ items.program_id }/>)}</Row>
                    <Row>{data.slice(2, 4)?.map(items => <Task items={ items } key={ items.program_id }/>)}</Row>
                    <Row>{data.slice(4, 6)?.map(items => <Task items={ items } key={ items.program_id }/>)}</Row>
                </div>
            </div>
            <Bar />
        </Content>
      </Base>
    )
}