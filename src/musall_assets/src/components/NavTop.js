import styled from 'styled-components';

const NavCont = styled.div`
	width:100%;
	display:inline-flex;
	justify-content:space-between;
	padding:20px;

	.logo{
		font-size:2rem;
	}

	.log-in{
		display:flex;
		align-items:center ;
		justify-content:center;
		padding:0 20px;
		border-radius: 10px;
		background: rgba(168, 16, 121, 1);
	}
`

export default function Nav() {

    return <NavCont>
		<div className='logo'>MUSALL</div>
		<div className='log-in'>Login</div>
</NavCont>
}
