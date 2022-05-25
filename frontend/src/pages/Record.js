import { React, useState, useEffect } from 'react';
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

	// opacity: 0.4;
	// background-image: url("/images/cover_5.png");
	// background-repeat: no-repeat;
	// background-position: 50% ;
	// background-size: cover;
`

const StyledCalendar = styled.div `
	width: 800px;
	height: 100%;

	margin-right: 60px;
	// background-color: #e2e2e2;
`

const Desc = styled.div `
	width: 730px;

	margin-bottom: 80px;
	padding: 40px;

	background-color: #f3f3f3;
	border-radius: 30px;

	font-family: 'PingFangTc';
	font-size: 40px;
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
	magin: 20px 0 0 0;
	font-family: 'PingFangTC';
	font-size: 34px;
	text-align: center;
`

const Row = styled.div `
	width: 1100px;
	margin: 15px 0;
	display: flex;
	justify-content: space-around;
`

const Submit = styled.button `
	padding: 10px 30px;

	border: none;
	border-radius: 20px;
	background-color: #0053B4;

	font-family: 'PingFangTC';
	font-style: normal;
	font-size: 40px;
	color: #ffffff;
	text-align: center;

	cursor: pointer;

	&:hover {
		background-color: #c7e0fc;
		color: #0053B4;
		box-shadow: 2px 2px 1px 2px rgba(0, 0, 0, 0.2);
	}
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

function convertTZ(date, tzString) {
	return (new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}))).toString();   
}

function nowDate() {
	const now = convertTZ(new Date(), "Asia/Jakarta")
	var year = now.toString().split(" ")[3]
	var month = months[now.toString().split(" ")[1]]
	var date = now.toString().split(" ")[2]
	return (year + '-' + month + '-' + date)
}

function Task(props) {
	//console.log(props.item)
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
		props.setDate(year + '-' + month + '-' + date)
	};
  
	return (
		<DatePicker onChange={onChange} />
	);
};

function RecordInfo(props) {
	const isToday = (props.today === props.date)
	// Check whether the data is fetched
	if (props.equip === undefined || props.equip === 0 || props.record.records === [])
		return null;

	if (props.record.records[props.equip - 1].status === 'finished') {
		let day = '';
		if (props.record.day === 'free') day = props.record.day;
		else if (props.record.day === null) day = '非訓練日'
		else day = 'Day ' + props.record.day;
		return (
			<div className='recordInfo'>
				<div>日期：{props.date}</div>
				<div>訓練計畫：{ day }</div>
				<div>器材：{props.record.records[props.equip - 1].name}</div>
				<div>狀態：完成訓練</div>
			</div>
		); 
	} else if (props.record.records[props.equip - 1].status === 'unfinished') {
		return (
			<div className='recordInfo'>
				<div>日期：{props.date}</div>
				<div>訓練計畫：{props.record.day !== null ? 'Day' + props.record.day : '非訓練日'}</div>
				<div>器材：{props.record.records[props.equip - 1].name}</div>
				<div>狀態：尚未完成訓練</div>
			</div>
		);
	} else if (props.record.records[props.equip - 1].status === 'optional' && isToday) {
		return (
			<div className='recordInfo'>
				<div>日期：{props.date}</div>
				<div>訓練計畫：{props.record.day !== null ? props.record.day : '非訓練日'}</div>
				<div>器材：{props.record.records[props.equip - 1].name}</div>
				<div>狀態：無訓練紀錄</div>
			</div>
		);
	} else if (props.record.records[props.equip - 1].status === 'optional' && !isToday) {
		return (
			<div className='recordInfo'>
				<div>日期：{props.date}</div>
				<div>訓練計畫：{props.record.day !== null ? props.record.day : '非訓練日'}</div>
				<div>器材：{props.record.records[props.equip - 1].name}</div>
				<div>狀態：無訓練紀錄</div>
			</div>
		);
	}
};

function RecordForm(props) {
	const isToday = (props.today === props.date)

	// Check whether the data is fetched
	if (props.equip === undefined || props.equip === 0 || props.record.records === [])
		return null;

	// Add record to database
	function addRecord() {
		// Set record input info
		var weightInput = null
		var setsInput = null
		var repsInput = null
		if (props.record.records[props.equip - 1].status === 'finished') {
			console.log(props.equip)
			weightInput = props.record.records[props.equip - 1].weight
			setsInput = props.record.records[props.equip - 1].sets
			repsInput = props.record.records[props.equip - 1].reps
		} else if (props.record.records[props.equip - 1].status === 'unfinished') {
			console.log(props.equip)
			weightInput = props.weightInput
			setsInput = props.record.records[props.equip - 1].sets
			repsInput = props.record.records[props.equip - 1].reps
		} else if (props.record.records[props.equip - 1].status === 'optional') {
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
			"day": props.record.day
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

	if (props.record.records[props.equip - 1].status === 'finished') {
		return (
			<div className="form">
				<div className="form__field">
					<div className="form__field-name">重量</div>
					<input
						key={props.record.records[props.equip - 1].weight}
						className="form__field-input"
						defaultValue={props.record.records[props.equip - 1].weight}
						disabled={true}
					/>
				</div>
				<div className="form__field">
					<div className="form__field-name">組數</div>
					<input
						key={props.record.records[props.equip - 1].sets}
						className="form__field-input"
						defaultValue={props.record.records[props.equip - 1].sets}
						disabled={true}
					/>
				</div>
				<div className="form__field" >
					<div className="form__field-name">單位</div>
					<input
						key={props.record.records[props.equip - 1].reps}
						className="form__field-input"
						defaultValue={props.record.records[props.equip - 1].reps}
						disabled={true}
					/>
				</div>
			</div>
		); 
	} else if (props.record.records[props.equip - 1].status === 'unfinished') {
		return (
			<div className="form">
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
						key={props.record.records[props.equip - 1].sets}
						className="form__field-input"
						defaultValue={props.record.records[props.equip - 1].sets}
						disabled={true}
					/>
				</div>
				<div className="form__field" >
					<div className="form__field-name">單位</div>
					<input
						key={props.record.records[props.equip - 1].reps}
						className="form__field-input"
						defaultValue={props.record.records[props.equip - 1].reps}
						disabled={true}
					/>
				</div>
				<Submit onClick={addRecord}>確認</Submit>
			</div>
		);
	} else if (props.record.records[props.equip - 1].status === 'optional' && isToday) {
		return (
			<div className="form">
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
						key={props.record.records[props.equip - 1].sets}
						className="form__field-input"
						value={ props.setsInput }
						onChange={(e) => props.setSetsInput(e.target.value)}
					/>
				</div>
				<div className="form__field" >
					<div className="form__field-name">單位</div>
					<input
						key={props.record.records[props.equip - 1].reps}
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

function RecordField({date, today, equip, record, weightInput, setWeightInput, setsInput, setSetsInput, repsInput, setRepsInput}) {
	if (equip === undefined || equip === 0 || record.records === [])
		return <div style={{ width: '610px'}} />;
	else return (
		<div style={{ display: 'block', marginLeft: '100px', padding: '50px', border: 'solid 5px #0053B4', borderRadius: '40px'}}>
			<RecordInfo date={date} today={today} equip={equip} record={record} weightInput={weightInput} setWeightInput={setWeightInput} setsInput={setsInput} setSetsInput={setSetsInput} repsInput={repsInput} setRepsInput={setRepsInput}/>
			<RecordForm date={date} today={today} equip={equip} record={record} weightInput={weightInput} setWeightInput={setWeightInput} setsInput={setsInput} setSetsInput={setSetsInput} repsInput={repsInput} setRepsInput={setRepsInput}/>
		</div>
	)
}

export default function Record() {
	const today = nowDate()
	const [date, setDate] = useState(nowDate());
	const [record, setRecord] = useState({day: null, records: []});
	const [equip, setEquip] = useState(0);
	const [weightInput, setWeightInput] = useState('');
	const [setsInput, setSetsInput] = useState('');
	const [repsInput, setRepsInput] = useState('');

	useEffect(() => {
		//JWT authentication
		if (window.localStorage.getItem('JWT') == null) {
			window.alert('請先登入')
			window.location.href = "/"
		}
	}, [])

	useEffect(() => {
		axios.get("http://localhost:8000/getRecord/" + date, {
			headers: {
			  'Authorization': `${localStorage.getItem('JWT')}`
			}
		})
		.then( (response) => {
			console.log("response:", response.data)
			setRecord(response.data)
			setEquip(0)
		})
		.catch( (error) => console.log(error))
	}, [date])

	useEffect(() => {
		if (equip === 0)
			return
		if (record.records[equip - 1].status === 'finished') {
		} else if (record.records[equip - 1].status === 'unfinished') {
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
		<div style={{ height: '100%', paddingTop: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<div style={{ display: 'block' }}>
				<Desc>「每一步雖小，但只要持續往前走，總有一天會到終點！」檢視過往的健身紀錄，並留下每次的健身痕跡，一步一步接近自己的理想體態！</Desc>
				<StyledCalendar>
					<Calendar setDate={setDate}/>
				</StyledCalendar>
			</div>
			<div style={{ display: 'flex', alignItems: 'center'}}>
				<div style={{ display: 'block' }}>
					<Row>{record.records.slice(0, 4)?.map(item => <Task item={ item } key={ item.equip_id } setEquip={ setEquip }/>)}</Row>
					<Row>{record.records.slice(4, 8)?.map(item => <Task item={ item } key={ item.equip_id } setEquip={ setEquip }/>)}</Row>
					<Row>{record.records.slice(8, 12)?.map(item => <Task item={ item } key={ item.equip_id } setEquip={ setEquip }/>)}</Row>
					<Row>{record.records.slice(12, 16)?.map(item => <Task item={ item } key={ item.equip_id } setEquip={ setEquip }/>)}</Row>
					<Row>{record.records.slice(16, 20)?.map(item => <Task item={ item } key={ item.equip_id } setEquip={ setEquip }/>)}</Row>
				</div>
				<RecordField date={date} today={today} equip={equip} record={record} weightInput={weightInput} setWeightInput={setWeightInput} setsInput={setsInput} setSetsInput={setSetsInput} repsInput={repsInput} setRepsInput={setRepsInput}/>
			</div>
		</div>
	</Base>
	);
}
