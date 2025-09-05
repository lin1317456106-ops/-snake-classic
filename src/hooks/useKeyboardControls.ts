import { useEffect, useCallback } from 'react';
import { GAME_CONFIG } from '../data/config';

interface UseKeyboardControlsProps {
  onDirectionChange: (direction: string) => void;
  onTogglePause: () => void;
  onRestart: () => void;
  onStart: () => void;
  gameStarted: boolean;
  isGameOver: boolean;
}

const useKeyboardControls = ({
  onDirectionChange,
  onTogglePause,
  onRestart,
  onStart,
  gameStarted,
  isGameOver
}: UseKeyboardControlsProps) => {
  
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const { code } = event;
    
    // 防止默认行为（如页面滚动）
    const allKeys = Object.values(GAME_CONFIG.KEY_BINDINGS).flat();
    if (allKeys.includes(code as any)) {
      event.preventDefault();
    }

    // 游戏未开始时，只响应开始键
    if (!gameStarted && !isGameOver) {
      if (GAME_CONFIG.KEY_BINDINGS.START.includes(code as any)) {
        onStart();
      }
      return;
    }

    // 游戏结束时，只响应重开键
    if (isGameOver) {
      if (GAME_CONFIG.KEY_BINDINGS.RESTART.includes(code as any)) {
        onRestart();
      }
      return;
    }

    // 游戏进行中的控制
    if (GAME_CONFIG.KEY_BINDINGS.UP.includes(code as any)) {
      onDirectionChange('UP');
    } else if (GAME_CONFIG.KEY_BINDINGS.DOWN.includes(code as any)) {
      onDirectionChange('DOWN');
    } else if (GAME_CONFIG.KEY_BINDINGS.LEFT.includes(code as any)) {
      onDirectionChange('LEFT');
    } else if (GAME_CONFIG.KEY_BINDINGS.RIGHT.includes(code as any)) {
      onDirectionChange('RIGHT');
    } else if (GAME_CONFIG.KEY_BINDINGS.PAUSE.includes(code as any)) {
      onTogglePause();
    } else if (GAME_CONFIG.KEY_BINDINGS.RESTART.includes(code as any)) {
      onRestart();
    }
  }, [onDirectionChange, onTogglePause, onRestart, onStart, gameStarted, isGameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
};

export default useKeyboardControls;