import { useState } from 'react'
import Calendar, { CalendarProps } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './customCalendar.css'

interface ScheduleDate {
	date: string
}

const CalendarMain: React.FC = () => {
	const [value, onChange] = useState<Date>(new Date())
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [showNavigation, setShowNavigation] = useState<boolean>(false)

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

	const handleCalendarChange: CalendarProps['onChange'] = (value, event) => {
		if (value instanceof Date) {
			onChange(value)
			setSelectedDate(value)
			event
			formatDate(value)
		} else {
			console.error('Unexpected value type in handleCalendarChange')
		}
	}

	const formatDate = (date: Date): ScheduleDate => {
		const year = date.getFullYear()
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const day = date.getDate().toString().padStart(2, '0')
		console.log({ date: `${year}-${month}-${day}` })
		// Пример того что мы получили {date: '2024-02-08'}
		return { date: `${year}-${month}-${day}` }
	}

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
			</div>
		</div>
	)
}

export default CalendarMain
