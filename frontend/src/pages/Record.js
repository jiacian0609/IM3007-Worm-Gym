import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'sassy-datepicker';
import styled from 'styled-components';
import axios from 'axios';

import '../css/record.css';
import Header from '../components/Header';

const Base = styled.div `
	width: 100%;
	height: 100%;
	position: absolute;
`

const Background = styled.img `
	width: 100%;
	height: 100%;

	content: '';
	display: block;
	position: absolute;
		left: 0;
		top: 0;
		z-index: -1;

	opacity: 0.4;
	background-image: url("/images/cover_5.png");
	background-repeat: no-repeat;
	background-position: 50% ;
	background-size: cover;
`

const Content = styled.div `
	position: relative;
`

const StyledCalendar = styled.div `
	width: 800px;
	height: 1000px;

	margin: 50px 100px 50px 200px;
	background-color: #e2e2e2;
`

const Img = styled.div `
	width: 150px;
	height: 150px;

	margin: 0 auto;
	border-radius: 50%;

	background-color: #27CE24;
	background-image: url("${props => props.src}");
	background-size: 70%;
	background-repeat: no-repeat;
	background-position: 50% 50%;
`

const Text = styled.div `
	width: 300px;
	height: 40px;
	magin: 20px 0 0 0;
	font-size: 34px;
	text-align: center;
`

const Row = styled.div `
	width: 1100px;
	height: 190px;
	margin: 40px 0;
	display: flex;
	justify-content: space-around;
`

const Submit = styled.button `
	width: 140px;
	height: 80px;

	padding: 2px;
	margin: 20px 150px 20px;

	background: #35D11B;
	border: 3px solid #35D11B;
	border-radius: 8px;

	font-style: normal;
	font-weight: 400;
	font-size: 40px;
`

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

function Task(items) {
	//console.log(items)
	return (
		<div style={{ display: 'block', alignItems: 'center' }}>
			<Img src={ '../images/gym_' + items.items.id + '.png' } />
			<Text>{ items.items.name }</Text>
		</div>
	);
};

function Calendar(props) {
	// Change date
	const onChange = (d) => {
		var year = d.toString().split(" ")[3]
		var month = months[d.toString().split(" ")[1]]
		var date = d.toString().split(" ")[2]
		if (date >= 1 && date < 8)
			props.setStartDate(year + '-' + month + '-01')
		else if (date >= 8 && date < 15)
			props.setStartDate(year + '-' + month + '-08')
		else if (date >= 15 && date < 22)
			props.setStartDate(year + '-' + month + '-15')
		else
			props.setStartDate(year + '-' + month + '-22')
		props.setDate(year + '-' + month + '-' + date)
	};
  
	return (
		<DatePicker onChange={onChange} />
	);
};

// choose day
/*
<select className="shipment__item-selector" defaultValue="taiwan">
	<option value="taiwan">臺灣及離島</option>
</select>*/

export default function Record() {
	const equips = [{id: 1, name: '橢圓機'}, {id: 2, name: '跑步機'}, {id: 3, name: '飛輪車'}, {id: 4, name: '雙槓抬腿機'},
		{id: 5, name: '蝴蝶夾胸機'}, {id: 6, name: '直立式腳踏車'}, {id: 7, name: '臥式腳踏車'}, {id: 8, name: '划船機'},
		{id: 9, name: '滾輪'}, {id: 10, name: '夾胸器'}, {id: 11, name: '啞鈴彎舉'}, {id: 12, name: '負重深蹲'},
		{id: 13, name: '側腹旋'}, {id: 14, name: '腿推機'}, {id: 15, name: '滑輪下拉機'}, {id: 16, name: '啞鈴肩推'},
		{id: 17, name: '啞鈴反握手腕彎舉'}, {id: 18, name: '舉槓臥推'}, {id: 19, name: '捲腹'}, {id: 20, name: '引體向上'}];

	const [weight, setWeight] = useState();
	const [set, setSet] = useState();
	const [unit, setUnit] = useState();
	const [date, setDate] = useState();
	const [startDate, setStartDate] = useState();
	const [day, setDay] = useState('free');
	const [days, setDays] = useState([]);

	useEffect(() => {
		// Default startDate
		const now = new Date()
		var nowYear = now.toString().split(" ")[3]
		var nowMonth = months[now.toString().split(" ")[1]]
		var nowDate = now.toString().split(" ")[2]
		if (nowDate >= 1 && nowDate < 8)
			setStartDate(nowYear + '-' + nowMonth + '-01')
		else if (nowDate >= 8 && nowDate < 15)
			setStartDate(nowYear + '-' + nowMonth + '-08')
		else if (nowDate >= 15 && nowDate < 22)
			setStartDate(nowYear + '-' + nowMonth + '-15')
		else
			setStartDate(nowYear + '-' + nowMonth + '-22')
		setDate(nowYear + '-' + nowMonth + '-' + nowDate)
	}, []) 

	useEffect(() => {
		setDay('free')
		if (startDate === undefined) {
			setDays([])
		} else {
			axios.get("http://localhost:8000/menu/" + startDate, {
				headers: {
				'Authorization': `${localStorage.getItem('JWT')}`
				}
			})
			.then( (response) => {
				setDays([])
				var newDays = []
				for (let index = 0; index < response.data.length; index+=6) {
					newDays.push(response.data[index].Day)
					if (index === response.data.length - 6) setDays(newDays)
				}
			})
			.catch( (error) => console.log(error))
		}
	}, [date])

	useEffect(() => {
		if (date === undefined)
			return
		axios.get("http://localhost:8000/getRecord/" + date + "/" + day, {
			headers: {
			  'Authorization': `${localStorage.getItem('JWT')}`
			}
		})
		.then( (response) => {
			console.log("response:", response.data)
		})
		.catch( (error) => console.log(error))
	}, [date, day])

	return (
	<Base>
		<Header />
		<Background />
		<Content>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<div style={{ display: 'block', alignItems: 'center' }}>
					<StyledCalendar>
						<Calendar setDate={setDate} setStartDate={setStartDate}/>
					</StyledCalendar>
				</div>
				<div style={{ display: 'flex' }}>
					<div style={{ display: 'block', height: '1000px' }}>
						<Row>{equips.slice(0, 4)?.map(items => <Task items={ items } key={ items.id }/>)}</Row>
						<Row>{equips.slice(4, 8)?.map(items => <Task items={ items } key={ items.id }/>)}</Row>
						<Row>{equips.slice(8, 12)?.map(items => <Task items={ items } key={ items.id }/>)}</Row>
						<Row>{equips.slice(12, 16)?.map(items => <Task items={ items } key={ items.id }/>)}</Row>
						<Row>{equips.slice(16, 20)?.map(items => <Task items={ items } key={ items.id }/>)}</Row>
					</div>
					<div className="form">
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<div className='planTitle'>今日計畫</div>
							<div className="day">
								<select className="day-selector" defaultValue="free" onChange={(e) => setDay(e.target.value)}>
									{days?.map(day => <option key={day} value={day}>Day {day}</option>)}
									<option value="free">Free</option>
								</select>
							</div>
						</div>
						<div className="form__field">
							<div className="form__field-name">重量</div>
							<input
								className="form__field-input"
								value={ weight }
								onChange={(e) => setWeight(e.target.value)}
							/>
						</div>
						<div className="form__field">
							<div className="form__field-name">組數</div>
							<input
								className="form__field-input"
								value={ set }
								onChange={(e) => setSet(e.target.value)}
							/>
						</div>
						<div className="form__field">
							<div className="form__field-name">單位</div>
							<input
								className="form__field-input"
								value={ unit }
								onChange={(e) => setUnit(e.target.value)}
							/>
						</div>
						<Submit>確認</Submit>
					</div>
				</div>
			</div>
		</Content>
	</Base>
	);
}