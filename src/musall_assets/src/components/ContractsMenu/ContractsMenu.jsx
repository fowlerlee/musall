import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Text, Spacer, FlexContainer } from '@sharingexcess/designsystem';
import { useIsMobile } from '../../hooks';
import PlugConnect from '@psychedelic/plug-connect';
import canisterIds from '../../../../../.dfx/local/canister_ids.json';

export function ContractMenu({ isOpen, setIsOpen, album_id }) {
  const isMobile = useIsMobile();
  const canisterId1 = canisterIds.__Candid_UI.local;
  const canisterId2 = canisterIds.musall_assets.local;
  const canisterId3 = canisterIds.musall.local;

  let whitelist = [canisterId1, canisterId2, canisterId3];
  let host = 'https://mainnet.dfinity.network';

  useEffect(() => {
    async function verifyConnectionAndAgent() {
      const connected = await window.ic.plug.isConnected();
      if (!connected) window.ic.plug.requestConnect({ whitelist, host });
      if (connected && !window.ic.plug.agent) {
        window.ic.plug.createAgent({ whitelist, host });
      }
    }
    verifyConnectionAndAgent();
  }, []);

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
          <Link to={url}>
            <Text type='subheader' classList={['Menu-link']}>
              {label}
            </Text>
          </Link>
        </li>
        <Spacer height={16} />
      </>
    );
  }

  function AlbumCover() {
    return (
      <FlexContainer direction='vertical' secondaryAlign='start'>
        <img src='hendrix.png' alt='' id='Album-Cover' />
      </FlexContainer>
    );
  }
  return (
    <>
      {isOpen && isMobile ? (
        <div id='MenuBackground' onClick={closeMenu} />
      ) : null}
      <aside id='Menu' className={isOpen ? 'open' : 'closed'}>
        <AlbumCover />
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
              label='&nbsp;&nbsp;Description'
              url={`/albums/${album_id}/description`}
            />
            <>
              <MenuLink
                label='&nbsp;&nbsp;Scope Of Work'
                url={`/albums/${album_id}/scope-of-work`}
              />
              <MenuLink
                label='&nbsp;&nbsp;Price Of Item'
                url={`/albums/${album_id}/price-of-item`}
              />
              <MenuLink
                label='&nbsp;&nbsp;Terms Of Ownership'
                url={`/albums/${album_id}/terms-of-ownership`}
              />
            </>
            <MenuLink
              label='&nbsp;&nbsp;Owner'
              url={`/albums/${album_id}/owner`}
            />
          </ul>
        </div>
      </aside>
    </>
  );
}
