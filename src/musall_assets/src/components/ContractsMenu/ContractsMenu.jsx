import React, { useEffect } from 'react';
import { FaCircle } from 'react-icons/fa';
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
        <div id='Contract-MenuBackground' onClick={closeMenu} />
      ) : null}
      <aside id='Contract-Menu' className={isOpen ? 'open' : 'closed'}>
        {/* <AlbumCover /> */}
        <div id='Contract-MenuContent'>
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
              label='Description'
              url={`/albums/${album_id}/description`}
            />
            <>
              <MenuLink
                label='Scope Of Work'
                url={`/albums/${album_id}/scope-of-work`}
              />
              <MenuLink
                label='Price Of Item'
                url={`/albums/${album_id}/price-of-item`}
              />
              <MenuLink
                label='Terms Of Ownership'
                url={`/albums/${album_id}/terms-of-ownership`}
              />
            </>
            <MenuLink label='Owner' url={`/albums/${album_id}/owner`} />
          </ul>
        </div>
      </aside>
    </>
  );
}
