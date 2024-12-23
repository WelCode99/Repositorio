import { TimerConfig } from '../../types/emergency';

export function createTimer(config: TimerConfig) {
  let interval: NodeJS.Timeout | null = null;
  let remainingTime = config.duration || 0;

  const start = () => {
    if (interval) return;
    
    interval = setInterval(() => {
      if (config.type === 'countdown') {
        remainingTime--;
        if (remainingTime <= 0) {
          stop();
          if (config.alert) {
            playAlert();
          }
        }
      }
    }, 1000);
  };

  const stop = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  const reset = () => {
    stop();
    remainingTime = config.duration || 0;
  };

  const playAlert = () => {
    if (config.sound) {
      const audio = new Audio('/alert.mp3');
      audio.play().catch(console.error);
    }
  };

  return {
    start,
    stop,
    reset,
    getRemainingTime: () => remainingTime
  };
}