import React from 'react';

interface StartScreenProps {
  onStartGame: () => void;
  highScore: number;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, highScore }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '400px',
      fontFamily: 'monospace',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      color: 'white',
      padding: '40px'
    }}>
      <h1 style={{
        fontSize: '36px',
        marginBottom: '10px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        letterSpacing: '2px'
      }}>
        🐍 贪吃蛇
      </h1>
      
      <p style={{
        fontSize: '16px',
        marginBottom: '30px',
        opacity: 0.9
      }}>
        经典怀旧 · 现代体验
      </p>
      
      {highScore > 0 && (
        <div style={{
          fontSize: '18px',
          marginBottom: '30px',
          padding: '10px 20px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '20px'
        }}>
          最高分: {highScore}
        </div>
      )}
      
      <button
        onClick={onStartGame}
        style={{
          padding: '15px 30px',
          fontSize: '20px',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '25px',
          background: '#4caf50',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(76, 175, 80, 0.4)',
          transition: 'all 0.3s ease',
          transform: 'translateY(0)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.4)';
        }}
      >
        开始游戏
      </button>
      
      <div style={{
        marginTop: '30px',
        fontSize: '14px',
        opacity: 0.8,
        lineHeight: '1.5'
      }}>
        <p>控制: ↑↓←→ 或 WASD</p>
        <p>空格键开始 · ESC暂停 · R重开</p>
      </div>
    </div>
  );
};

export default StartScreen;