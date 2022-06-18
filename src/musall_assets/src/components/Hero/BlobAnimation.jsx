import React from 'react';
import styled from 'styled-components';

const Blob = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  background: linear-gradient(
    180deg,
    rgba(47, 184, 255, 0.42) 31.775,
    #9eecd9 100%
  );
  border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
  mix-blend-mode: color-dodge;
`;
export function BlobAnimations() {
  return <Blob />;
}

// wave wrapper
