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
	height: 180px;

	margin: 15px 0 0 35px;

	font-size: 34px;
	text-align: left;
`

const Row = styled.div `
	width: 1400px;
	height: 300px;
	margin: 20px;
	display: flex;
`

const Day = styled.button `
	width: 140px;
	height: 80px;

	padding: 2px;
	margin: 20px 0;

	background: #35D11B;
	border: 3px solid #35D11B;
	border-radius: 8px;

	font-style: normal;
	font-weight: 400;
	font-size: 40px;
`

function Task(items) {
	//console.log(items)
	const equips = [{id: 1, name: '橢圓機'}, {id: 2, name: '跑步機'}, {id: 3, name: '飛輪車'}, {id: 4, name: '雙槓抬腿機'},
        {id: 5, name: '蝴蝶夾胸機'}, {id: 6, name: '直立式腳踏車'}, {id: 7, name: '臥式腳踏車'}, {id: 8, name: '划船機'},
        {id: 9, name: '滾輪'}, {id: 10, name: '夾胸器'}, {id: 11, name: '啞鈴彎舉'}, {id: 12, name: '負重深蹲'},
        {id: 13, name: '側腹旋'}, {id: 14, name: '腿推機'}, {id: 15, name: '滑輪下拉機'}, {id: 16, name: '啞鈴肩推'},
        {id: 17, name: '啞鈴反握手腕彎舉'}, {id: 18, name: '舉槓臥推'}, {id: 19, name: '捲腹'}, {id: 20, name: '引體向上'}];

	return (
		<div style={{ display: 'flex', margin: '50px 200px 50px 50px' }}>
			<Img src={ '../images/gym_' + items.items.equip_id + '.png' } />
			<Text>
				{ equips[items.items.equip_id - 1].name }<br/>
				--------------<br/>
				次數：{ items.items.reps } <br/>
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
	const [days, setDays] = useState([])
	const [day, setDay] = useState(1)
	const [allData, setAllData] = useState([])
	const [dayData, setDayData] = useState([])

	useEffect(() => {
		axios.get("http://localhost:8000/menu/" + date, {
			headers: {
			  'Authorization': `${localStorage.getItem('JWT')}`
			}
		})
		.then( (response) => {
			setAllData(response.data)
			setDayData(response.data.slice(0, 6))
			setDay(1)
			setDays([])
			var newDays = []
			for (let index = 0; index < response.data.length; index+=6) {
				newDays.push(response.data[index].Day)
				if (index === response.data.length - 6) setDays(newDays)
			}
		})
		.catch( (error) => console.log(error))
		//console.log(date)
	}, [date])

	useEffect(() => {
		setDayData(allData.slice((day - 1) * 6, day * 6))
		//console.log(allData.slice((day - 1) * 6, day * 6))
	}, [day])

	return (
	  <Base>
	  	<Header />
		<Bar />
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<StyledCalendar> 
				<Calendar setDate={setDate}/>
			</StyledCalendar>
			<div style={{ display: 'block', width: '140px', margin: '0 0 700px'}}>
				{days?.map(day => <Day key={ day } onClick={() => setDay(day)}>Day {day}</Day>)}
			</div>
			<div style={{display: 'inline', height: '1060px'}}>
				<Row>{dayData.slice(0, 2)?.map(items => <Task items={ items } key={ items.program_id }/>)}</Row>
				<Row>{dayData.slice(2, 4)?.map(items => <Task items={ items } key={ items.program_id }/>)}</Row>
				<Row>{dayData.slice(4, 6)?.map(items => <Task items={ items } key={ items.program_id }/>)}</Row>
			</div>
		</div>
		<Bar />
	  </Base>
	)
}