import React from 'react';
import LoginLogout from './LoginLogout'

import { GAME_STATE, getSeconds } from '../custom/utils';

const Header = ({ timeLeft, gameState, endGame }) => (
  <header className="navbar">
    {gameState === GAME_STATE.PLAYING && (
      <>
        <section className="navbar-center text-error">{getSeconds(timeLeft)} sekundir eftir</section>
        <section className="navbar-center">
          <LoginLogout />
          <button className="btn btn-default" onClick={endGame}>
            Enda spælið
          </button>
        </section>
      </>
    )}
  </header>
);

export default Header;