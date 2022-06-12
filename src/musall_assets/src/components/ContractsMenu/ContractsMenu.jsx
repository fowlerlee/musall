import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Text, Spacer } from '@sharingexcess/designsystem';
import { Emoji } from 'react-apple-emojis';
import { useIsMobile } from '../../hooks';
import PlugConnect from '@psychedelic/plug-connect';
import canisterIds from '../../../../../.dfx/local/canister_ids.json';
import { useAlbum } from '../../hooks/useAlbum';

export function ContractMenu({ isOpen, setIsOpen, album_id }) {
  const isMobile = useIsMobile();

  console.log('[ALBUM ID]:=>', album_id);

  const album_contract = useAlbum('artists');
  console.log('[ARTIST FROM CONTRACT-MENU]:=>', album_contract);

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

  function AlbumCover() {
    return (
      <div>
        <h1>ALBUM MENU</h1>
        <img src='logo.png' alt='' id='Album-Cover' height={100} width={100} />
      </div>
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
              emoji='question-mark'
              num={20}
              label='&nbsp;&nbsp;Description'
              url={`/albums/${album_id}/description`}
            />
            <>
              <MenuLink
                emoji='plus'
                num={20}
                label='&nbsp;&nbsp;Scope Of Work'
                url={`/albums/${album_id}/scope-of-work`}
              />
              <MenuLink
                emoji='envelope'
                num={20}
                label='&nbsp;&nbsp;Price Of Item'
                url={`/albums/${album_id}/price-of-item`}
              />
              <MenuLink
                emoji='family'
                num={20}
                label='&nbsp;&nbsp;Terms Of Ownership'
                url={`/albums/${album_id}/terms-of-ownership`}
              />
            </>
            <MenuLink
              emoji='information'
              num={20}
              label='&nbsp;&nbsp;Owner'
              url={`/albums/${album_id}/owner`}
            />
          </ul>
        </div>
      </aside>
    </>
  );
}
