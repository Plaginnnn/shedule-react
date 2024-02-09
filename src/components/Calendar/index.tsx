import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './customCalendar.css'

interface ScheduleDate {
	date: string
}

const CalendarMain = () => {
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

	const handleCalendarChange = (value: unknown & Date) => {
		onChange(value)
		setSelectedDate(value)

		const formattedDate: ScheduleDate = formatDate(value)
		console.log(formattedDate)
	}

	const formatDate = (date: Date): ScheduleDate => {
		const year = date.getFullYear()
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const day = date.getDate().toString().padStart(2, '0')
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
