import { createGlobalStyle }  from "styled-components"

export const GlobalStyles = createGlobalStyle`
    html, body{
        font-family: 'Jost', sans-serif;
        //font-size:1em;
		color:white;
        background:linear-gradient(0deg, rgba(87, 13, 86, 1) 0%, rgba(46, 2, 73, 1) 45%);
        overflow:hidden;
        height:100vh;
        //letter-spacing:-0.02rem;
    }
    a {
        text-decoration: none;
    }
    `