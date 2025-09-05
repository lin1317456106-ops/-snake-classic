import type { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'firstWin',
    name: '初次胜利',
    description: '第一次得分超过50分',
    unlocked: false
  },
  {
    id: 'score100',
    name: '百分达成',
    description: '单局得分达到100分',
    unlocked: false
  },
  {
    id: 'score500',
    name: '高手进阶',
    description: '单局得分达到500分',
    unlocked: false
  },
  {
    id: 'noWalls',
    name: '小心翼翼',
    description: '连续10局不撞墙死亡',
    unlocked: false
  },
  {
    id: 'speedster',
    name: '闪电蛇王',
    description: '在困难模式下得分超过200分',
    unlocked: false
  },
  {
    id: 'persistent',
    name: '坚持不懈',
    description: '累计游戏100局',
    unlocked: false
  }
];

export const checkAchievements = (
  score: number, 
  difficulty: 'simple' | 'normal' | 'hard',
  gamesPlayed: number,
  currentAchievements: string[]
): string[] => {
  const newAchievements: string[] = [];

  // 检查各种成就条件
  if (score >= 50 && !currentAchievements.includes('firstWin')) {
    newAchievements.push('firstWin');
  }

  if (score >= 100 && !currentAchievements.includes('score100')) {
    newAchievements.push('score100');
  }

  if (score >= 500 && !currentAchievements.includes('score500')) {
    newAchievements.push('score500');
  }

  if (difficulty === 'hard' && score >= 200 && !currentAchievements.includes('speedster')) {
    newAchievements.push('speedster');
  }

  if (gamesPlayed >= 100 && !currentAchievements.includes('persistent')) {
    newAchievements.push('persistent');
  }

  return newAchievements;
};