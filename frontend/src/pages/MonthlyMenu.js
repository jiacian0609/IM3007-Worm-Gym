import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'sassy-datepicker';
import axios from 'axios';
import Header from '../components/Header';

const months = {
	Jan: '01',
	Feb: '02',
	Mar: '03',
	Apr: '04',
	May: '05',
	Jun: '06',
	Jul: '07',
	Aug: '08',
	Sep: '09',
	Oct: '10',
	Nov: '11',
	Dec: '12',
  }

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
function Calendar(props) {
	const onChange = (d) => {
		var year = d.toString().split(" ")[3]
		var month = months[d.toString().split(" ")[1]]
		var date = d.toString().split(" ")[2]
		if (date >= 1 && date < 8)
			date = '01'
		else if (date >= 8 && date < 15)
			date = '08'
		else if (date >= 15 && date < 22)
			date = '15'
		else
			date = '22'
		props.setDate(year + '-' + month + '-' + date)
	};
  
	return (
		<DatePicker onChange={onChange} />
	);
};

export default function MonthlyMenu() {
	const [date, setDate] = useState(useParams().month)
	const [data, setData] = useState([])

	useEffect(() => {
		axios.get("http://localhost:8000/menu/" + date, {
			headers: {
			  'Authorization': `${localStorage.getItem('JWT')}`
			}
		})
		.then( (response) => setData(response.data))
		.catch( (error) => console.log(error))
	}, [date])
	//console.log(data)   

	return (
	  <Base>
		<Content>
			<Title>Worm Gym</Title>
			<Bar />
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<StyledCalendar> 
					<Calendar setDate={setDate}/>
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