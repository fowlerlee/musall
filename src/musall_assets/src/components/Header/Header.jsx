import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../../hooks';
import { Menu } from '../Menu/Menu';
import { FlexContainer, Button } from '@sharingexcess/designsystem';

export function Header() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(!isMobile);

  const linkStyle = {
    margin: '1rem',
    textDecoration: 'none',
    color: 'white',
  };

  return (
    <FlexContainer
      id='Header'
      direction='hoizontal'
      primaryAlign='space-between'
    >
      <Menu isOpen={menuOpen} setIsOpen={setMenuOpen} />

      <Link style={linkStyle} to='/'>
        <h1>MUSALL</h1>
      </Link>
      {isMobile && (
        <Button type='tertiary' handler={() => setMenuOpen(true)}>
          MENU
        </Button>
      )}
    </FlexContainer>
  );
}
