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

const Selector = styled.select `
  	width: 400px; 
	height: 110px;

	margin-bottom: 50px;
    padding: 10px 30px;
	font-family: 'NotoSansTC';
    font-size: 50px;
	line-height: 50px;

    border: none;
    border-radius: 50px;
    background: #ACE3EB;
    display: flex;
    align-items: center;

    cursor: pointer;
`

const Desc = styled.div `
  width: 615px;

  padding: 50px;

  background-color: #f3f3f3;
  border-radius: 30px;

  font-family: 'PingFangTc';
  font-size: 45px;
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

	${(props) => props.active && `
		box-shadow: 10px 10px 5px 10px rgba(0, 0, 0, 0.2);
		background-color: #ACE3EB;
		border: solid 10px #ffffff;
    `}
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

const EquipInfoWrapper = styled.div `
	padding: 50px; 
	border: solid 5px #003778;
	border-radius: 80px;

	display: flex;
	flex-direction: column;
	align-items: center;
`

const EquipImg = styled.img `
	height: 300px;
`

const EquipContentWrapper = styled.div `
	padding-top: 50px;
	width: 500px;
`

const EquipContentRow = styled.div `
	margin-bottom: 30px;
	display: flex;
	align-items: center;
`

const EquipContentTitle = styled.div `
	width: 185px;
	margin-right: 20px;
	font-family: 'PingFangTC';
	font-size: 45px;
	font-style: bold;
	line-height: 55px;
	color: #003778;
	border-bottom: solid 5px #003778;
`

const EquipContentText = styled.div `
	font-family: 'PingFangTC';
	font-size: 38px;
	// margin-bottom: 40px;
	border-bottom: solid 6px #fff;
`

function Task(items) {
	//console.log(items)
	const equips = [{id: 1, name: '橢圓機'}, {id: 2, name: '跑步機'}, {id: 3, name: '飛輪車'}, {id: 4, name: '雙槓抬腿機'},
        {id: 5, name: '蝴蝶夾胸機'}, {id: 6, name: '直立式腳踏車'}, {id: 7, name: '臥式腳踏車'}, {id: 8, name: '划船機'},
        {id: 9, name: '滾輪'}, {id: 10, name: '夾胸器'}, {id: 11, name: '啞鈴彎舉'}, {id: 12, name: '負重深蹲'},
        {id: 13, name: '側腹旋'}, {id: 14, name: '腿推機'}, {id: 15, name: '滑輪下拉機'}, {id: 16, name: '啞鈴肩推'},
        {id: 17, name: '啞鈴反握手腕彎舉'}, {id: 18, name: '舉槓臥推'}, {id: 19, name: '捲腹'}, {id: 20, name: '引體向上'}];

	return (
		<TaskWrapper onClick={() => items.setEquip(items.items.equip_id)} active={items.equip === items.items.equip_id}>
			<Img src={ '../images/gym_' + items.items.equip_id + '.png' } />
			<Texts>
				<Text>{ equips[items.items.equip_id - 1].name }</Text>
				<Divider />
				<Text>次數：{ items.items.reps }</Text>
				<Text>組數：{ items.items.sets }</Text>
			</Texts>
		</TaskWrapper>
	);
};

function EquipInfo(props) {
	const equipInfoContent = [
		{id: 1, name: '橢圓機', part: '心肺功能', info: '橢圓機可以使用到所有的肌肉，並有效地消耗卡路里，並有效地燃燒多餘的脂肪。'}, 
		{id: 2, name: '跑步機', part: '', info: '跑步為一個很好的鍛煉方法之一。可瘦身、可提高心肺功能、增強身體各部位的肌肉組織、提高身體免疫力。'},
		{id: 3, name: '飛輪車', part: '心肺功能', info: '與一般健身車不同的是，騎乘飛輪車時許多動作除了依賴腿部肌肉的踩踏外，是要建立在強壯的核心肌群來平衡。'},
		{id: 4, name: '雙槓抬腿機', part: '下腹肌群', info: '這個動作能幫助我們提高腹部力量，並且加深腹部肌肉線條的分離程度，讓你的腹肌更加完美。'},
		{id: 5, name: '蝴蝶夾胸機', part: '胸部肌群', info: '蝴蝶夾胸主要鍛鍊胸溝分離度，雕刻胸部線條，胸肌的紋路是橫著的，夾胸是很符合胸肌生長紋路的。'},
		{id: 6, name: '直立式腳踏車', part: '心肺功能', info: '直立式健身車模擬一般騎腳踏車的感覺，操作方便、上手簡單，非常適合一般減重和缺乏運動的朋友。'},
		{id: 7, name: '臥式腳踏車', part: '心肺功能', info: '臥式健身車因為有靠背支撐腰部，對腰部和臀部的負擔較小，讓腰痛、沒有體力的人和年長者也能長時間運動。'},
		{id: 8, name: '划船機', part: '背部肌群', info: '划船機訓練是個全身性、高效率的燃脂運動，能促進身體的協調性。'},
		{id: 9, name: '滾輪', part: '腹肌肌群', info: '滾輪運動是屬於複合式訓練的一種，可有效鍛練、雕塑肌肉線條，有助強化身體多處肌群，尤其上半身核心肌群。'},
		{id: 10, name: '夾胸器', part: '胸部肌群', info: ''},
		{id: 11, name: '啞鈴彎舉', part: '二頭肌', info: '小口訣：身體自然下放，不聳肩；行程越完整，二頭長越大；手臂保持在身體兩側，肩膀沒煩惱。'},
		{id: 12, name: '負重深蹲', part: '大腿肌群', info: '肌力訓練的主要內容，能練到全身最多的肌肉，能讓你安全地做到最大範圍的漸進式超負荷。練得越好，體格外觀和肌力就會越強。'},
		{id: 13, name: '側腹旋', part: '腹部肌群', info: '有效訓練側腹肌，側腹肌重要功能就是抗旋轉—維持軀幹的穩定；這對人類的直立活動模式而言，非常重要。'},
		{id: 14, name: '腿推機', part: '大腿與臀部肌群', info: '對於難以下蹲的人來說是很好的選擇，可有效率的訓練大腿肌肉群及強化膝關節和髖關節的活動度。'},
		{id: 15, name: '滑輪下拉機', part: '背部肌群', info: '背闊肌負責肩部的內收和伸展，並幫助手臂向身體內外拉，滑輪下拉是完美的練背動作，幫助背闊肌更寬並建立V形背部。'},
		{id: 16, name: '啞鈴肩推', part: '肩膀、上胸、三頭肌', info: '啞鈴肩推是訓練肩膀三角肌相當熱門的訓練動作，坐姿能比站姿有更高的穩定性，可以更專注的訓練三角肌。'},
		{id: 17, name: '啞鈴反握手腕彎舉', part: '前臂肌群', info: '小臂肌肉不發達，會其他肌肉的鍛鍊，增強前臂的力量能幫你舉起更大的負重，同時，發達的前臂能讓你穿t恤時顯得更好看。'},
		{id: 18, name: '舉槓臥推', part: '胸部肌群', info: '訓練出緊實的胸肌，也能讓手臂肌肉和背部肌肉變得更強壯，輕鬆地舉起東西，還能使上半身肌肉更協調、改善骨骼健康。'},
		{id: 19, name: '捲腹', part: '腹肌肌群', info: '比起仰臥起坐，捲腹訓練更集中在腹部肌肉上，可以避免脊椎與脖子施力錯誤受傷，而且捲腹動作變化多元。'},
		{id: 20, name: '引體向上', part: '背部肌群、二頭肌', info: '引體向上最主要用到的是闊背肌！當肩胛向內收的時候，闊背肌就會呈現三角形，最理想的體態就會慢慢練出來！'}
	];

	// console.log('/images/equip/' + props.equip_id + '.jpg')
	if (props.equip_id === undefined) return <div style={{ width: '610px' }}/>;
	else return (
		<EquipInfoWrapper>
			<EquipImg src={`/images/equip/${props.equip_id}.jpg`} />
			<EquipContentWrapper>
				<EquipContentRow>
					<EquipContentTitle>器材名稱</EquipContentTitle>
					<EquipContentText>{equipInfoContent[props.equip_id - 1].name}</EquipContentText>
				</EquipContentRow>
				<EquipContentRow>
					<EquipContentTitle>訓練部位</EquipContentTitle>
					<EquipContentText>{equipInfoContent[props.equip_id - 1].part}</EquipContentText>
				</EquipContentRow>
				<EquipContentTitle style={{ marginBottom: '20px'}}>器材簡介</EquipContentTitle>
				<EquipContentText>{equipInfoContent[props.equip_id - 1].info}</EquipContentText>
			</EquipContentWrapper>
		</EquipInfoWrapper>
	)
}

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
	const date = useParams().month
	const [equip, setEquip] = useState();
	const [dates, setDates] = useState([])
	const [day, setDay] = useState(1)
	const [days, setDays] = useState([])
	const [allData, setAllData] = useState([])
	const [dayData, setDayData] = useState([])

	// console.log(date)

	useEffect(() => {
		//JWT authentication
		if (window.localStorage.getItem('JWT') == null) {
			window.alert('請先登入')
			window.location.href = "/"
		}
	}, [])

	useEffect(() => {
		axios.get("http://localhost:8000/menu/all", {
			headers: {
			  'Authorization': `${localStorage.getItem('JWT')}`
			}
		})
		.then( (response) => {
			var newDates = []
			for (let index = 0; index < response.data.length; index++) {
				newDates.push(response.data[index].date.slice(0, 10))
			}
			setDates(newDates)
		})
		.catch( (error) => console.log(error))
	}, [])

	useEffect(() => {
		axios.get("http://localhost:8000/menu/" + date, {
			headers: {
			  'Authorization': `${localStorage.getItem('JWT')}`
			}
		})
		.then( (response) => {
			// console.log(response.data)
			setAllData(response.data)
			setDayData(response.data.slice(0, 6))
			setDay(1)
			setDays([])
			// Get the number of training days
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
		<div style={{ display: 'flex', paddingTop: '170px', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
			<div style={{ marginRight: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Selector
					id="month"
					value={date}
					onChange={e => window.location.href = "./" + e.target.value}
				>
					{dates?.map(date => <option value={date} key={date}>{date}</option>)}
				</Selector>
				<Selector
					id="day"
					defaultValue={days[0]}
					onChange={e => {
						setDay(e.target.value)
						setEquip()
					}}
				>
					{days?.map(day => <option value={day} key={day}>Day {day}</option>)}
				</Selector>
				<Desc>在這裡可以查看由專業教練依照你的身體組成以及訓練目標調配出的最適訓練計畫，協助你有系統地進行健身運動，快來將它們一一完成吧！</Desc>
			</div>
			<Rows>
				<Row>{dayData.slice(0, 2)?.map(items => <Task items={ items } key={ items.program_id } equip={equip} setEquip={setEquip}/>)}</Row>
				<Row>{dayData.slice(2, 4)?.map(items => <Task items={ items } key={ items.program_id } equip={equip} setEquip={setEquip}/>)}</Row>
				<Row>{dayData.slice(4, 6)?.map(items => <Task items={ items } key={ items.program_id } equip={equip} setEquip={setEquip}/>)}</Row>
			</Rows>
			<EquipInfo equip_id={equip} />
		</div>
	  </Base>
	)
}