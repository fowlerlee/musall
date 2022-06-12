import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Text, Spacer } from '@sharingexcess/designsystem';
import { Emoji } from 'react-apple-emojis';
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

  async function logout() {
    if (window.confirm('Are you sure you want to log out?')) {
      setIsOpen(false);
      await signOut(auth);
      navigate('/');
      window.location.reload();
    }
  }

  function MenuLink({ url, label, emoji, num }) {
    return (
      <>
        <li onClick={() => setIsOpen(false)}>
          <Link to={url}>
            <Text type='subheader' classList={['Menu-link']}>
              <Emoji name={emoji} width={num} />
              {label}
            </Text>
          </Link>
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
            <MenuLink
              emoji='question-mark'
              num={20}
              label='&nbsp;&nbsp;Albums'
              url='/albums'
            />
            <>
              <MenuLink
                emoji='plus'
                num={20}
                label='&nbsp;&nbsp;Vacation Homes'
                url='/vacation-homes'
              />
              <MenuLink
                emoji='envelope'
                num={20}
                label='&nbsp;&nbsp;Apartments'
                url='/apartments'
              />
              <MenuLink
                emoji='family'
                num={20}
                label='&nbsp;&nbsp;Concerts'
                url='/concerts'
              />
            </>
            <MenuLink
              emoji='information'
              num={20}
              label='&nbsp;&nbsp;Films'
              url='/films'
            />
            <MenuLink
              emoji='person-raising-hand'
              num={20}
              label='&nbsp;&nbsp;Research Projects'
              url='/research-projects'
            />
            <li onClick={logout}>
              <Text type='subheader' classList={['Menu-link']}>
                <Emoji name='door' width={20} />
                &nbsp;&nbsp;Logout
              </Text>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
