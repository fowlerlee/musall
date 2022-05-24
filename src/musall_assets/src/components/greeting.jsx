import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../style/main.css";
import logo from "../images/logo.png";
import { greet } from "../services/wrapper";

async function doGreet(name) {
  const greeting = await greet(name);
  document.getElementById("greeting").innerText = greeting;
}

function Greeting() {
  const [input, setInput] = useState("");

  return (
    <Fragment>
      <li id="approve">
        <div class="signature">
          <b>approve</b>: (principal, nat) → ()
        </div>
        <div class="input-container">
          <span>
            <input class="argument" placeholder="principal" />
            <span class="status" style="display: none;">
              InputError: Principal "aaaaa-aa" does not have a valid checksum.
            </span>
          </span>
          <span>
            <input class="argument" placeholder="nat" />
            <span class="status" style="display: none;"></span>
          </span>
        </div>
        <div class="button-container">
          <button class="btn">Call</button>
          <button class="btn random">Random</button>
        </div>
        <div class="result">
          <span class="result-buttons">
            <button class="btn text-btn active">Text</button>
            <button class="btn ui-btn">UI</button>
            <button class="btn json-btn">JSON</button>
          </span>
          <div class="left"></div>
          <div class="right"></div>
        </div>
      </li>

	  
      <div id="greetingSection">
        <img src={logo} alt="DFINITY logo" />
        <label>Your name:</label>
        <input
          type="text"
          name="name"
          value={input}
          onInput={(e) => setInput(e.target.value)}
        />
        <button id="clickMeBtn" onClick={() => doGreet(input)}>
          Call dfinity greet...
        </button>
      </div>
      <div id="greeting" />
      <Link to="/">Back</Link>
    </Fragment>
  );
}

export default Greeting;
