import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Context } from './context'
import Main from './pages/Main/Main'

export const App = () => {
	const tell = () => {
		alert('sdfsdf')
	}

	return (
		<Context.Provider value={{ tell }}>
			<div>
				<BrowserRouter>
					<Routes>
						<Route path='/main' element={<Main />} />
					</Routes>
				</BrowserRouter>
			</div>
		</Context.Provider>
	)
}

export default App
