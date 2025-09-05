import React from 'react';
import type { GameState, GameStatus } from '../../types';

interface GameInfoProps {
  gameState: GameState;
  gameStatus: GameStatus;
  highScore: number;
  onTogglePause: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({ 
  gameState, 
  highScore, 
  onTogglePause 
}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
      fontFamily: 'monospace',
      fontSize: '18px',
      fontWeight: 'bold'
    }}>
      <div>
        分数: {gameState.score}
      </div>
      
      <div>
        最高分: {highScore}
      </div>
      
      {gameState.gameStarted && !gameState.isGameOver && (
        <button
          onClick={onTogglePause}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            fontFamily: 'monospace',
            border: '2px solid #333',
            borderRadius: '4px',
            background: gameState.isPaused ? '#4caf50' : '#ff9800',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {gameState.isPaused ? '继续' : '暂停'}
        </button>
      )}
    </div>
  );
};

export default GameInfo;