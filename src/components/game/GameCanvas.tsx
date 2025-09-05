import React, { useRef, useEffect } from 'react';
import type { GameState } from '../../types';
import { GAME_CONFIG } from '../../data/config';
import { isMobile } from '../../utils/gameUtils';

interface GameCanvasProps {
  gameState: GameState;
  theme: 'classic' | 'modern' | 'dark';
}

const GameCanvas: React.FC<GameCanvasProps> = ({ gameState, theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasSize = isMobile() ? GAME_CONFIG.CANVAS_SIZE.MOBILE : GAME_CONFIG.CANVAS_SIZE.PC;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = GAME_CONFIG.THEMES[theme];
    
    // 清除画布
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制网格
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    for (let i = 0; i <= canvas.width; i += GAME_CONFIG.GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += GAME_CONFIG.GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    
    // 绘制蛇
    ctx.fillStyle = colors.snake;
    gameState.snake.forEach((segment, index) => {
      const x = segment.x * GAME_CONFIG.GRID_SIZE;
      const y = segment.y * GAME_CONFIG.GRID_SIZE;
      
      // 蛇头特殊处理 - 添加方向指示
      if (index === 0) {
        ctx.fillRect(x, y, GAME_CONFIG.GRID_SIZE, GAME_CONFIG.GRID_SIZE);
        
        // 绘制蛇头方向指示器
        ctx.fillStyle = colors.background;
        const centerX = x + GAME_CONFIG.GRID_SIZE / 2;
        const centerY = y + GAME_CONFIG.GRID_SIZE / 2;
        const size = 4;
        
        switch (gameState.direction) {
          case 'UP':
            ctx.fillRect(centerX - size/2, y + 4, size, size);
            break;
          case 'DOWN':
            ctx.fillRect(centerX - size/2, y + GAME_CONFIG.GRID_SIZE - 8, size, size);
            break;
          case 'LEFT':
            ctx.fillRect(x + 4, centerY - size/2, size, size);
            break;
          case 'RIGHT':
            ctx.fillRect(x + GAME_CONFIG.GRID_SIZE - 8, centerY - size/2, size, size);
            break;
        }
        ctx.fillStyle = colors.snake;
      } else {
        ctx.fillRect(x, y, GAME_CONFIG.GRID_SIZE, GAME_CONFIG.GRID_SIZE);
      }
    });
    
    // 绘制食物
    ctx.fillStyle = colors.food;
    const foodX = gameState.food.x * GAME_CONFIG.GRID_SIZE;
    const foodY = gameState.food.y * GAME_CONFIG.GRID_SIZE;
    
    // 绘制圆形食物
    ctx.beginPath();
    ctx.arc(
      foodX + GAME_CONFIG.GRID_SIZE / 2,
      foodY + GAME_CONFIG.GRID_SIZE / 2,
      GAME_CONFIG.GRID_SIZE / 2 - 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    
  }, [gameState, theme, canvasSize]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      style={{
        border: `2px solid ${GAME_CONFIG.THEMES[theme].snake}`,
        borderRadius: '8px',
        display: 'block'
      }}
    />
  );
};

export default GameCanvas;