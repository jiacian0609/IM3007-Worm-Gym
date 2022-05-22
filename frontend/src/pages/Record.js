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

	background-color: ${props => props.color};
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

function Task(props) {
	//console.log(props.item.status)
	if (props.item.status === 'finished') {
		return (
			<div style={{ margin: '15px 10px', display: 'block', alignItems: 'center', cursor: 'pointer' }} onClick={() => props.setEquip(props.item.equip_id)}>
				<Img src={ '../images/gym_' + props.item.equip_id + '.png'} color={'#00DB00'}/>
				<Text>{ props.item.name }</Text>
			</div>
		);
	} else if (props.item.status === 'unfinished') {
		return (
			<div style={{ margin: '15px 10px', display: 'block', alignItems: 'center', cursor: 'pointer' }} onClick={() => props.setEquip(props.item.equip_id)}>
				<Img src={ '../images/gym_' + props.item.equip_id + '.png'} color={'red'} />
				<Text>{ props.item.name }</Text>
			</div>
		);
	} else if (props.item.status === 'optional') {
		return (
			<div style={{ margin: '15px 10px', display: 'block', alignItems: 'center', cursor: 'pointer' }}
				onClick={() => {
					props.setEquip(props.item.equip_id)
					/* if (props.item.sets !== 0)
						props.setDefaultSets(props.item.sets)
					else
						props.setDefaultSets('')
					if (props.item.reps !== 0)
						props.setDefaultReps(props.item.reps)
					else
						props.setDefaultReps('')
					props.setWeight('')
					props.setSet('')
					props.setUnit('') */
				}}
			>
				<Img src={ '../images/gym_' + props.item.equip_id + '.png'} color={'gray'} />
				<Text>{ props.item.name }</Text>
			</div>
		);
	}
	
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

function RecordInput(props) {
	// Check whether the data is fetched
	if (props.equip === undefined || props.equip === 0 || props.record === [])
		return (
			<div></div>
		)

	// Add record to database
	function addRecord() {
		// Set record input info
		var weightInput = null
		var setsInput = null
		var repsInput = null
		if (props.record[props.equip - 1].status === 'finished') {
			console.log(props.equip)
			weightInput = props.record[props.equip - 1].weight
			setsInput = props.record[props.equip - 1].sets
			repsInput = props.record[props.equip - 1].reps
		} else if (props.record[props.equip - 1].status === 'unfinished') {
			console.log(props.equip)
			weightInput = props.weightInput
			setsInput = props.record[props.equip - 1].sets
			repsInput = props.record[props.equip - 1].reps
		} else if (props.record[props.equip - 1].status === 'optional') {
			console.log(props.equip)
			weightInput = props.weightInput
			setsInput = props.setsInput
			repsInput = props.repsInput
		}

		// Call record API to insert record into database
		axios.post("http://localhost:8000/record", {
			"equip_id": props.equip,
			"weight": weightInput,
			"reps": repsInput,
			"sets": setsInput,
			"date": props.date,
			"day": props.day
		}, {
			headers: {
			  'Authorization': `${localStorage.getItem('JWT')}`
			}
		})
        .then( (response) => {
            console.log(response)
			window.location.reload()
		})
		.catch( (error) => console.log(error))
	}

	if (props.record[props.equip - 1].status === 'finished') {
		return (
			<div>
				<div className="form__field">
					<div className="form__field-name">重量</div>
					<input
						key={props.record[props.equip - 1].weight}
						className="form__field-input"
						defaultValue={props.record[props.equip - 1].weight}
						disabled={true}
					/>
				</div>
				<div className="form__field">
					<div className="form__field-name">組數</div>
					<input
						key={props.record[props.equip - 1].sets}
						className="form__field-input"
						defaultValue={props.record[props.equip - 1].sets}
						disabled={true}
					/>
				</div>
				<div className="form__field" >
					<div className="form__field-name">單位</div>
					<input
						key={props.record[props.equip - 1].reps}
						className="form__field-input"
						defaultValue={props.record[props.equip - 1].reps}
						disabled={true}
					/>
				</div>
			</div>
		);
	} else if (props.record[props.equip - 1].status === 'unfinished') {
		return (
			<div>
				<div className="form__field">
					<div className="form__field-name">重量</div>
					<input
						className="form__field-input"
						value={ props.weightInput }
						onChange={(e) => props.setWeightInput(e.target.value)}
					/>
				</div>
				<div className="form__field">
					<div className="form__field-name">組數</div>
					<input
						key={props.record[props.equip - 1].sets}
						className="form__field-input"
						defaultValue={props.record[props.equip - 1].sets}
						disabled={true}
					/>
				</div>
				<div className="form__field" >
					<div className="form__field-name">單位</div>
					<input
						key={props.record[props.equip - 1].reps}
						className="form__field-input"
						defaultValue={props.record[props.equip - 1].reps}
						disabled={true}
					/>
				</div>
				<Submit onClick={addRecord}>確認</Submit>
			</div>
		);
	} else if (props.record[props.equip - 1].status === 'optional') {
		return (
			<div>
				<div className="form__field">
					<div className="form__field-name">重量</div>
					<input
						className="form__field-input"
						value={ props.weightInput }
						onChange={(e) => props.setWeightInput(e.target.value)}
					/>
				</div>
				<div className="form__field">
					<div className="form__field-name">組數</div>
					<input
						className="form__field-input"
						value={ props.setsInput }
						onChange={(e) => props.setSetsInput(e.target.value)}
					/>
				</div>
				<div className="form__field" >
					<div className="form__field-name">單位</div>
					<input
						className="form__field-input"
						value={ props.repsInput }
						onChange={(e) => props.setRepsInput(e.target.value)}
					/>
				</div>
				<Submit onClick={addRecord}>確認</Submit>
			</div>
		);
	}
};

// choose day
/*
<select className="shipment__item-selector" defaultValue="taiwan">
	<option value="taiwan">臺灣及離島</option>
</select>*/

export default function Record() {
	const [date, setDate] = useState();
	const [startDate, setStartDate] = useState();
	const [day, setDay] = useState('free');
	const [days, setDays] = useState([]);
	const [record, setRecord] = useState([]);
	const [equip, setEquip] = useState(0);
	const [weightInput, setWeightInput] = useState('');
	const [setsInput, setSetsInput] = useState('');
	const [repsInput, setRepsInput] = useState('');

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
		setEquip(0)
		if (date === undefined)
			return
		axios.get("http://localhost:8000/getRecord/" + date + "/" + day, {
			headers: {
			  'Authorization': `${localStorage.getItem('JWT')}`
			}
		})
		.then( (response) => {
			console.log(date + "/" + day)
			console.log("response:", response.data)
			setRecord(response.data)
			//console.log(record)
		})
		.catch( (error) => console.log(error))
	}, [date, day])

	useEffect(() => {
		if (equip === 0)
			return
		if (record[equip - 1].status === 'finished') {
		} else if (record[equip - 1].status === 'unfinished') {
			setWeightInput('')
		} else {
			setWeightInput('')
			setSetsInput('')
			setRepsInput('')
		}
	}, [equip, record]) 

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
						<Row>{record.slice(0, 4)?.map(item => <Task item={ item } key={ item.equip_id } setEquip={ setEquip }/>)}</Row>
						<Row>{record.slice(4, 8)?.map(item => <Task item={ item } key={ item.equip_id } setEquip={ setEquip }/>)}</Row>
						<Row>{record.slice(8, 12)?.map(item => <Task item={ item } key={ item.equip_id } setEquip={ setEquip }/>)}</Row>
						<Row>{record.slice(12, 16)?.map(item => <Task item={ item } key={ item.equip_id } setEquip={ setEquip }/>)}</Row>
						<Row>{record.slice(16, 20)?.map(item => <Task item={ item } key={ item.equip_id } setEquip={ setEquip }/>)}</Row>
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
						<RecordInput date={date} day={day} equip={equip} record={record} weightInput={weightInput} setWeightInput={setWeightInput} setsInput={setsInput} setSetsInput={setSetsInput} repsInput={repsInput} setRepsInput={setRepsInput}/>
					</div>
				</div>
			</div>
		</Content>
	</Base>
	);
}