import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { HEROES, COMICS } from './custom/data';
import { shuffle, getTimeLeft, move, GAME_STATE } from './custom/utils';
import Modal from './components/Modal';
import Header from './components/Header';
import Dropzone from './components/Dropzone';
import Footer from './components/Footer';
import Highscore from './components/Highscore';

const GAME_DURATION = 1000 * 60 * 2; // 2 minutes

const initialState = {
  // we initialize the state by populating the bench with a shuffled collection of heroes
  Óflokkað: shuffle(HEROES),
  [COMICS.DC]: [],
  [COMICS.MARVEL]: [],
  gameState: GAME_STATE.READY,
  timeLeft: 0,
};

class App extends React.Component {
  state = initialState;

  startGame = () => {
    this.currentDeadline = Date.now() + GAME_DURATION;

    this.setState(
      {
        gameState: GAME_STATE.PLAYING,
        timeLeft: getTimeLeft(this.currentDeadline),
      },
      this.gameLoop
    );
  };

  gameLoop = () => {
    this.timer = setInterval(() => {
      const timeLeft = getTimeLeft(this.currentDeadline);
      const isTimeout = timeLeft <= 0;
      if (isTimeout && this.timer) {
        clearInterval(this.timer);
      }

      this.setState({
        timeLeft: isTimeout ? 0 : timeLeft,
        ...(isTimeout ? { gameState: GAME_STATE.DONE } : {}),
      });
    }, 1000);
  };

  endGame = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.setState({
      gameState: GAME_STATE.DONE,
    });
  };

  resetGame = () => {
    this.setState(initialState);
  };

  onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    this.setState(state => {
      return move(state, source, destination);
    });
  };

  render() {
    const { gameState, timeLeft, Óflokkað, ...groups } = this.state;
    const isDropDisabled = gameState === GAME_STATE.DONE;

    return (
      <>
        <Header gameState={gameState} timeLeft={timeLeft} endGame={this.endGame} />
        {this.state.gameState !== GAME_STATE.PLAYING && (
          <Modal
            startGame={this.startGame}
            resetGame={this.resetGame}
            timeLeft={timeLeft}
            gameState={gameState}
            groups={groups}
          />
        )}
        {(this.state.gameState === GAME_STATE.PLAYING ||
          this.state.gameState === GAME_STATE.DONE) && (
            <>
              <DragDropContext onDragEnd={this.onDragEnd}>
                <div >
                  <div className="columns">
                    <div className="img-drop-background-top">
                      <Dropzone
                        id={COMICS.MARVEL}
                        heroes={this.state[COMICS.MARVEL]}
                        isDropDisabled={isDropDisabled}
                      />
                    </div>
                    <div className="img-drop-background-mid">
                      <Dropzone id="Óflokkað" heroes={Óflokkað} isDropDisabled={isDropDisabled} endGame={this.endGame} />
                    </div>
                    <div className="img-drop-background-bottom">
                      <Dropzone
                        id={COMICS.DC}
                        heroes={this.state[COMICS.DC]}
                        isDropDisabled={isDropDisabled}
                      />
                    </div>
                  </div>
                </div>
              </DragDropContext>
              <Highscore />
            </>
          )}
        <Footer />
      </>
    );
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}

export default App;
