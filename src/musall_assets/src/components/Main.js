import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import NavTop from './NavTop'
import Nav from './Nav'
import Home from './sections/Home'
import Albums from './sections/Albums'
import VacationHomes from './sections/VacationHomes'
import Appartments from './sections/Appartments'
import Concerts from './sections/Concerts'
import Films from './sections/Films'
import ResearchProjects from './sections/ResearchProjects'

const MainCont = styled.div`
	display:flex;
	flex-direction:column;
	align-items:center;
`

export default function Main() {

    return <MainCont>
		<NavTop />
		<Nav />
		<Routes>
			<Route exact path="/" element={<>Hello world!</>}/>
			<Route path="/home" element={<Home />}/>
			<Route path="/albums" element={<Albums />}/>
			<Route path="/vacation-homes" element={<VacationHomes />}/>
			<Route path="/appartments" element={<Appartments />}/>
			<Route path="/concerts" element={<Concerts />}/>
			<Route path="/films" element={<Films />}/>
			<Route path="/research-projects" element={<ResearchProjects />}/>
			<Route path="*" element={
				<div style={{ padding: "1rem" }}>
					<p>There's nothing here!</p>
				</div>
				}
			/>
		</Routes>
  </MainCont>
}
