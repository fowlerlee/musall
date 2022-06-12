import React, { useEffect, useState } from "react";
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  render() {
    return (
      <Input
        ref={this.inputRef}
        placeholder="Hover to focus!"
        onMouseEnter={() => {
          this.inputRef.current.focus()
        }}
      />
    );
  }
}

export default FileInput;

// render(
//   <FileInput />
// );