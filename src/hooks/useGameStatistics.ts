import { useState } from 'react';
import type { GameStatistics } from '../types';
import { getGameData, saveGameData } from '../utils/gameUtils';

const useGameStatistics = () => {
  const [statistics, setStatistics] = useState<GameStatistics>(() => {
    const gameData = getGameData();
    return gameData.statistics;
  });

  const updateStatistics = (gameScore: number, gameTime: number) => {
    const newStats = {
      gamesPlayed: statistics.gamesPlayed + 1,
      totalScore: statistics.totalScore + gameScore,
      avgGameTime: Math.round(
        (statistics.avgGameTime * statistics.gamesPlayed + gameTime) / 
        (statistics.gamesPlayed + 1)
      )
    };

    setStatistics(newStats);
    
    // 保存到localStorage
    const gameData = getGameData();
    saveGameData({
      ...gameData,
      statistics: newStats
    });
  };

  const resetStatistics = () => {
    const resetStats = {
      gamesPlayed: 0,
      totalScore: 0,
      avgGameTime: 0
    };
    
    setStatistics(resetStats);
    
    const gameData = getGameData();
    saveGameData({
      ...gameData,
      statistics: resetStats
    });
  };

  return {
    statistics,
    updateStatistics,
    resetStatistics
  };
};

export default useGameStatistics;