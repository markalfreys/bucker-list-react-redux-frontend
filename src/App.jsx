import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './assets/css/App.css'

import { getItem } from './actions/listAction'

import Header from './components/Header'
import AddListForm from './components/AddListForm'
import ListContainer from './components/ListContainer'
import ErrorModal from './components/ErrorModal'


function App() {

	const { lists } = useSelector(state => state.list)
	const dispath = useDispatch()

	useEffect(() => {
		dispath(getItem())
	}, [])
	

    return (
		<div>
			<div id='backgroundCont'></div>
			<Header />
			<div id='bodyContainer'>
				<AddListForm />
				<ListContainer />
			</div>
			{ lists?.error && <ErrorModal  error={lists?.error} /> }

		</div>
    )
}

export default App
