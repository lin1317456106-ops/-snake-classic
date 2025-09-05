import React from 'react';
import { isMobile } from '../../utils/gameUtils';

interface VirtualControlsProps {
  onDirectionChange: (direction: string) => void;
  gameStarted: boolean;
  isGameOver: boolean;
}

const VirtualControls: React.FC<VirtualControlsProps> = ({ 
  onDirectionChange, 
  gameStarted, 
  isGameOver 
}) => {
  if (!isMobile() || !gameStarted || isGameOver) {
    return null;
  }

  const buttonStyle = {
    width: '60px',
    height: '60px',
    border: '2px solid #333',
    borderRadius: '8px',
    background: '#f0f0f0',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none' as const,
    touchAction: 'manipulation' as const
  };

  const handleTouchStart = (direction: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    onDirectionChange(direction);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      marginTop: '20px',
      padding: '20px'
    }}>
      <div>
        <button
          style={buttonStyle}
          onTouchStart={handleTouchStart('UP')}
          onClick={() => onDirectionChange('UP')}
        >
          ↑
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <button
          style={buttonStyle}
          onTouchStart={handleTouchStart('LEFT')}
          onClick={() => onDirectionChange('LEFT')}
        >
          ←
        </button>
        
        <button
          style={buttonStyle}
          onTouchStart={handleTouchStart('RIGHT')}
          onClick={() => onDirectionChange('RIGHT')}
        >
          →
        </button>
      </div>
      
      <div>
        <button
          style={buttonStyle}
          onTouchStart={handleTouchStart('DOWN')}
          onClick={() => onDirectionChange('DOWN')}
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default VirtualControls;