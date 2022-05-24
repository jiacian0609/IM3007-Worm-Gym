import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'sassy-datepicker';
import axios from 'axios';
import Header from '../components/Header';
import '../css/monthlyMenu.css';

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
	width: 100%;
	height: 100%;
	position: absolute;
`

const SelectorsWrapper = styled.div `
	padding: 150px;
`

const Selector = styled.select `
    height: 100px;
    width: 300px;

	margin-bottom: 50px;
    padding: 10px 30px;
	font-family: 'NotoSansTC';
    font-size: 50px;

    border: none;
    border-radius: 50px;
    background: #ACE3EB;
    display: flex;
    align-items: center;

    cursor: pointer;
`

const TaskWrapper = styled.button `
  	height: 300px;
	width: 600px;
  	margin: 0 100px 50px 0;
	
	display: flex;
	align-items: center;
	justify-content: center;

	background-color: #90c9d1;
    border: none;
    border-radius: 100px;
    box-shadow: 5px 5px 4px 5px rgba(0, 0, 0, 0.2);

    cursor: pointer;

    &:hover {
        box-shadow: 10px 10px 5px 10px rgba(0, 0, 0, 0.2);
        background-color: #ACE3EB;
        border: solid 10px #ffffff;
    }
`

const Img = styled.span `
	width: 200px;
	height: 200px;

	border-radius: 50%;

	// background-color: #27CE24;
	background-image: url("${props => props.src}");
	background-size: 70%;
	background-repeat: no-repeat;
	background-position: 50% 50%;
`

const Texts = styled.div `
	width: 300px;
`

const Text = styled.div `
	font-family: 'NotoSansTC';
	font-size: 34px;
	text-align: left;
`

const Divider = styled.div `
	width: 100%;
	height: 10px;
	margin: 15px 0;
	border-radius: 50px;
	background-color: #003778;
`

const Row = styled.div `
	margin: 20px;
	display: flex;
	justify-content: space-around;
`

const Rows = styled.div `
  	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

function Task(items) {
	//console.log(items)
	const equips = [{id: 1, name: '橢圓機'}, {id: 2, name: '跑步機'}, {id: 3, name: '飛輪車'}, {id: 4, name: '雙槓抬腿機'},
        {id: 5, name: '蝴蝶夾胸機'}, {id: 6, name: '直立式腳踏車'}, {id: 7, name: '臥式腳踏車'}, {id: 8, name: '划船機'},
        {id: 9, name: '滾輪'}, {id: 10, name: '夾胸器'}, {id: 11, name: '啞鈴彎舉'}, {id: 12, name: '負重深蹲'},
        {id: 13, name: '側腹旋'}, {id: 14, name: '腿推機'}, {id: 15, name: '滑輪下拉機'}, {id: 16, name: '啞鈴肩推'},
        {id: 17, name: '啞鈴反握手腕彎舉'}, {id: 18, name: '舉槓臥推'}, {id: 19, name: '捲腹'}, {id: 20, name: '引體向上'}];

	return (
		<TaskWrapper>
			<Img src={ '../images/gym_' + items.items.equip_id + '.png' } />
			<Texts>
				<Text>{ equips[items.items.equip_id - 1].name }</Text>
				<Divider />
				<Text>次數：{ items.items.reps }</Text>
				<Text>組數：{ items.items.sets } 組</Text>
			</Texts>
		</TaskWrapper>
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
		//JWT authentication
		if (window.localStorage.getItem('JWT') == null) {
			window.alert('請先登入')
			window.location.href = "/"
		}
	}, [])

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
		<div style={{ display: 'flex', paddingTop: '170px', height: '100%'}}>
			<SelectorsWrapper>
				<Selector
					id="month"
					defaultValue="2022-05"
					onChange={e => setDay(e.target.value)}
				>
					{/* data?.map(items => <option value={items.year + '-' + items.month} key={items.year + items.month}>{items.year + '-' + items.month}</option>) */}
				</Selector>
				<Selector
					id="day"
					defaultValue={days[0]}
					onChange={e => setDay(e.target.value)}
				>
					{days?.map(day => <option value={day} key={day}>Day {day}</option>)}
				</Selector>
			</SelectorsWrapper>
			<Rows>
				<Row>{dayData.slice(0, 2)?.map(items => <Task items={ items } key={ items.program_id }/>)}</Row>
				<Row>{dayData.slice(2, 4)?.map(items => <Task items={ items } key={ items.program_id }/>)}</Row>
				<Row>{dayData.slice(4, 6)?.map(items => <Task items={ items } key={ items.program_id }/>)}</Row>
			</Rows>
		</div>
	  </Base>
	)
}