import React, { useEffect } from 'react';
import { FaCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { FlexContainer, Text, Spacer } from '@sharingexcess/designsystem';
import { useIsMobile } from '../../hooks';
import PlugConnect from '@psychedelic/plug-connect';
import canisterIds from '../../../../../.dfx/local/canister_ids.json';

export function Menu({ isOpen, setIsOpen }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const canisterId1 = canisterIds.__Candid_UI.local;
  const canisterId2 = canisterIds.musall_assets.local;
  const canisterId3 = canisterIds.musall.local;

  let whitelist = [canisterId1, canisterId2, canisterId3];
  let host = 'https://mainnet.dfinity.network';

  // useEffect(() => {
  // async function verifyConnectionAndAgent() {
  //   const connected = await window.ic.plug.isConnected();
  //   if (!connected) window.ic.plug.requestConnect({ whitelist, host });
  //   if (connected && !window.ic.plug.agent) {
  //     window.ic.plug.createAgent({ whitelist, host });
  //   }
  // }
  // verifyConnectionAndAgent();
  // }, []);

  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [isMobile]);

  function closeMenu() {
    setIsOpen(false);
  }

  function MenuLink({ url, label }) {
    return (
      <>
        <li onClick={() => setIsOpen(false)}>
          <div
            direction='horizontal'
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Spacer width={8} />
            <div>
              <FaCircle />
            </div>
            <Spacer width={8} />
            <div>
              <Link to={url}>
                <p>{label}</p>
              </Link>
            </div>
            <Spacer width={8} />
          </div>
        </li>
        <Spacer height={16} />
      </>
    );
  }
  return (
    <>
      {isOpen && isMobile ? (
        <div id='MenuBackground' onClick={closeMenu} />
      ) : null}
      <aside id='Menu' className={isOpen ? 'open' : 'closed'}>
        <div id='MenuContent'>
          <ul>
            <PlugConnect
              dark
              title='login'
              host='https://mainnet.dfinity.network'
              whitelist={[canisterId1, canisterId2, canisterId3]}
              onConnectCallback={() => console.log('Some callback')}
            />
            <Spacer height={16} />
            <MenuLink label='Albums' url='/albums' />
            <>
              <MenuLink label='Vacation Homes' url='/vacation-homes' />
              <MenuLink label='Apartments' url='/apartments' />
              <MenuLink label='Concerts' url='/concerts' />
            </>
            <MenuLink label='Films' url='/films' />
            <MenuLink label='Research Projects' url='/research-projects' />
          </ul>
        </div>
      </aside>
    </>
  );
}
