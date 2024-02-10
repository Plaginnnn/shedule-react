import axios from 'axios'
import { useEffect, useState } from 'react'
import Calendar, { CalendarProps } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './customCalendar.css'

interface ScheduleDate {
	date: string
	group: string
}

const CalendarMain: React.FC = () => {
	const [value, onChange] = useState<Date>(new Date())
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [showNavigation, setShowNavigation] = useState<boolean>(false)
	const [scheduleDate, setScheduleDate] = useState<ScheduleDate>({
		date: '',
		group: '',
	})
	const [scheduleData, setScheduleData] = useState<ScheduleDate>() // Добавляем состояние для данных

	const goToPreviousMonth = () => {
		const previousMonth = new Date(value)
		previousMonth.setMonth(previousMonth.getMonth() - 1)
		onChange(previousMonth)
	}

	const goToNextMonth = () => {
		const nextMonth = new Date(value)
		nextMonth.setMonth(nextMonth.getMonth() + 1)
		onChange(nextMonth)
	}

	const handleCalendarChange: CalendarProps['onChange'] = value => {
		if (value instanceof Date) {
			onChange(value)
			setSelectedDate(value)
			const formattedDate = formatDate(value)
			setScheduleDate(formattedDate)
		} else {
			console.error('Unexpected value type in handleCalendarChange')
		}
	}

	const formatDate = (date: Date): ScheduleDate => {
		const year = date.getFullYear()
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const day = date.getDate().toString().padStart(2, '0')
		return { date: `${year}-${month}-${day}`, group: 'ПЭ-2-21' }
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://kgeu.2d.su/api/schedule.php?group=${scheduleDate.group}&date=${scheduleDate.date}`
				)
				setScheduleData(response.data)
				console.log(scheduleData)
			} catch (error) {
				console.error('Error fetching schedule data: ', error)
			}
		}

		fetchData()
	}, [scheduleDate]) // useEffect будет вызываться при изменении scheduleDate

	return (
		<div>
			<div>
				<button onClick={goToPreviousMonth}>Previous Month</button>
				<button onClick={goToNextMonth}>Next Month</button>
			</div>
			<div>
				<button onClick={() => setShowNavigation(!showNavigation)}>
					Toggle Navigation
				</button>
			</div>
			<div>
				<Calendar
					onChange={handleCalendarChange}
					value={value}
					maxDetail='month'
					className='custom-calendar'
					showNeighboringCentury={false}
					showNavigation={showNavigation}
				/>
			</div>
			<div>
				<p>
					Selected Date: {selectedDate ? selectedDate.toDateString() : 'None'}
				</p>
				<p>Schedule Date: {scheduleDate.date}</p>
				<p>Group: {scheduleDate.group}</p>
				{/* Отображаем полученные данные */}
				<li>sasdas</li>
			</div>
		</div>
	)
}

export default CalendarMain
