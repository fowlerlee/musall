import { NavLink } from 'react-router-dom'
import styled from 'styled-components';

const NavCont = styled.div`
	display:inline-flex;
	border-radius:50px;
    background: rgba(87, 13, 86, 1);
	margin-bottom:50px; 

	.red, .blue{
	border-radius:50px;
    padding:10px 20px;
    background: rgba(247, 28, 203, 1);
  }
  .blue{
    background: rgba(87, 13, 86, 1);
  }
`

const sections = [
    {name:'Albums', route:'albums', id:1},
    {name:'Vacation Homes', route:'vacation-homes', id:2},
    {name:'Appartments', route:'appartments', id:3},
    {name:'Concerts', route:'concerts', id:4},
    {name:'Films', route:'films', id:5},
    {name:'Research Projects', route:'research-projects', id:6}
]

export default function Nav() {

    return <NavCont>
		{sections.map(itm => (
			<NavLink
			key={itm.id} 
			className={({ isActive }) => isActive ? "red" : "blue"}  
			to={`/${itm.route}`}
			>
				{itm.name}
			</NavLink>
		))}
</NavCont>
}
