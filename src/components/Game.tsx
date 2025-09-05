import React, { useState, useEffect } from 'react';
import useGameState from '../hooks/useGameState';
import useKeyboardControls from '../hooks/useKeyboardControls';
import GameCanvas from './game/GameCanvas';
import GameInfo from './game/GameInfo';
import VirtualControls from './ui/VirtualControls';
import StartScreen from './pages/StartScreen';
import GameOverScreen from './pages/GameOverScreen';
import { getGameData, saveGameData } from '../utils/gameUtils';
import type { GameData } from '../types';

const Game: React.FC = () => {
  const [gameData, setGameData] = useState<GameData>(getGameData());
  const [showStartScreen, setShowStartScreen] = useState(true);
  
  const {
    gameState,
    gameStatus,
    startGame,
    togglePause,
    restartGame,
    changeDirection
  } = useGameState();

  // 键盘控制
  useKeyboardControls({
    onDirectionChange: changeDirection,
    onTogglePause: togglePause,
    onRestart: restartGame,
    onStart: handleStartGame,
    gameStarted: gameState.gameStarted,
    isGameOver: gameState.isGameOver
  });

  // 开始游戏
  function handleStartGame() {
    setShowStartScreen(false);
    startGame();
  }

  // 返回主菜单
  const handleBackToMenu = () => {
    setShowStartScreen(true);
    // 这里可以重置游戏状态，但useGameState会自动处理
  };

  // 检查是否创造新纪录
  const isNewRecord = gameState.score > gameData.highScore;

  // 游戏结束时保存数据
  useEffect(() => {
    if (gameState.isGameOver && gameState.score > 0) {
      const updatedData = {
        ...gameData,
        highScore: Math.max(gameData.highScore, gameState.score),
        statistics: {
          ...gameData.statistics,
          gamesPlayed: gameData.statistics.gamesPlayed + 1,
          totalScore: gameData.statistics.totalScore + gameState.score
        }
      };
      
      setGameData(updatedData);
      saveGameData(updatedData);
    }
  }, [gameState.isGameOver, gameState.score]);

  // 如果显示开始屏幕
  if (showStartScreen) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
      }}>
        <StartScreen
          onStartGame={handleStartGame}
          highScore={gameData.highScore}
        />
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '20px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative'
      }}>
        <GameInfo
          gameState={gameState}
          gameStatus={gameStatus}
          highScore={gameData.highScore}
          onTogglePause={togglePause}
        />
        
        <GameCanvas
          gameState={gameState}
          theme={gameData.settings.theme}
        />
        
        <VirtualControls
          onDirectionChange={changeDirection}
          gameStarted={gameState.gameStarted}
          isGameOver={gameState.isGameOver}
        />
        
        {gameState.isGameOver && (
          <GameOverScreen
            score={gameState.score}
            highScore={gameData.highScore}
            isNewRecord={isNewRecord}
            onRestart={restartGame}
            onBackToMenu={handleBackToMenu}
          />
        )}
        
        {gameState.isPaused && !gameState.isGameOver && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            fontSize: '24px',
            fontFamily: 'monospace',
            zIndex: 100
          }}>
            游戏已暂停<br />
            <span style={{ fontSize: '16px', marginTop: '10px' }}>
              按ESC继续
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;