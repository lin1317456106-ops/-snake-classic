export const GAME_CONFIG = {
  // 游戏区域尺寸
  CANVAS_SIZE: {
    PC: { width: 400, height: 400 },
    MOBILE: { width: 300, height: 300 }
  },
  
  // 网格设置
  GRID_SIZE: 20,
  
  // 蛇移动速度 (ms/格)
  SPEED: {
    simple: 200,
    normal: 150,
    hard: 100
  },
  
  // 游戏设置
  INITIAL_SNAKE_LENGTH: 3,
  FOOD_SCORE: 10,
  
  // 颜色主题
  THEMES: {
    classic: {
      background: '#000000',
      snake: '#00ff00',
      food: '#ff0000',
      grid: '#333333'
    },
    modern: {
      background: '#f0f0f0',
      snake: '#2196f3',
      food: '#ff5722',
      grid: '#e0e0e0'
    },
    dark: {
      background: '#1a1a1a',
      snake: '#4caf50',
      food: '#ffc107',
      grid: '#333333'
    }
  },
  
  // 按键映射
  KEY_BINDINGS: {
    UP: ['ArrowUp', 'KeyW'],
    DOWN: ['ArrowDown', 'KeyS'],
    LEFT: ['ArrowLeft', 'KeyA'],
    RIGHT: ['ArrowRight', 'KeyD'],
    PAUSE: ['Escape', 'KeyP'],
    RESTART: ['KeyR'],
    MUTE: ['KeyM'],
    START: [' '] // 空格键
  }
} as const;