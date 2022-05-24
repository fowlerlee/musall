import styled from 'styled-components';

const Cont = styled.div`
	width:calc(100% - 100px);
	display:flex;
	flex-direction:column;
	align-items:center;
	justify-content:center;
	padding:50px 20px;
	margin:0 100px;
	background: rgba(168, 16, 121, 0.1);

	.title{
		font-size:1.7rem;
	}
`
export default function Home() {

    return <Cont>
		<div className='title'>Home Page</div>
	</Cont>
}
