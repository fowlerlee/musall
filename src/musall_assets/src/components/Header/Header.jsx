import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useIsMobile } from '../../hooks';
import { Menu } from '../Menu/Menu';
import { ContractMenu } from '../ContractsMenu/ContractsMenu';
import {
  FlexContainer,
  Text,
  Button,
  Spacer,
} from '@sharingexcess/designsystem';
import { useParams } from 'react-router-dom';

export function Header() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(!isMobile);
  const { pathname } = useLocation();
  const { album_id } = useParams();

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
      {pathname.length > 8 && pathname.substring(1, 7) === 'albums' ? (
        <ContractMenu
          isOpen={menuOpen}
          setIsOpen={setMenuOpen}
          album_id={album_id}
        />
      ) : (
        <Menu isOpen={menuOpen} setIsOpen={setMenuOpen} />
      )}

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
