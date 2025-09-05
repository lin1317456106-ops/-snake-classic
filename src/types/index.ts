export interface Position {
  x: number;
  y: number;
}

export interface GameSettings {
  difficulty: 'simple' | 'normal' | 'hard';
  theme: 'classic' | 'modern' | 'dark';
  soundEnabled: boolean;
}

export interface GameStatistics {
  gamesPlayed: number;
  totalScore: number;
  avgGameTime: number;
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  score: number;
  isGameOver: boolean;
  isPaused: boolean;
  gameStarted: boolean;
}

export interface GameData {
  highScore: number;
  settings: GameSettings;
  statistics: GameStatistics;
  achievements: string[];
}

export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameOver';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
}