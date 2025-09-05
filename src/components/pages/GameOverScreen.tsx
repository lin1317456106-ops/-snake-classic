import React from 'react';

interface GameOverScreenProps {
  score: number;
  highScore: number;
  isNewRecord: boolean;
  onRestart: () => void;
  onBackToMenu: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  highScore,
  isNewRecord,
  onRestart,
  onBackToMenu
}) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      fontFamily: 'monospace',
      textAlign: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '40px',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h2 style={{
          fontSize: '32px',
          marginBottom: '20px',
          color: '#ff5722'
        }}>
          游戏结束
        </h2>
        
        {isNewRecord && (
          <div style={{
            fontSize: '20px',
            color: '#ffc107',
            marginBottom: '15px',
            animation: 'pulse 1.5s infinite'
          }}>
            🎉 新纪录！
          </div>
        )}
        
        <div style={{
          fontSize: '24px',
          marginBottom: '10px'
        }}>
          本次得分: <span style={{ color: '#4caf50' }}>{score}</span>
        </div>
        
        <div style={{
          fontSize: '18px',
          marginBottom: '30px',
          opacity: 0.8
        }}>
          最高分: {highScore}
        </div>
        
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center'
        }}>
          <button
            onClick={onRestart}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '6px',
              background: '#4caf50',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            再来一局 (R)
          </button>
          
          <button
            onClick={onBackToMenu}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              border: '2px solid #666',
              borderRadius: '6px',
              background: 'transparent',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#666';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            返回首页
          </button>
        </div>
      </div>
      
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}
      </style>
    </div>
  );
};

export default GameOverScreen;