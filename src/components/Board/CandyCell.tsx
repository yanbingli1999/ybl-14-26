import { Candy } from '@/types';
import { CANDY_CONFIG } from '@/data/config';
import { cn } from '@/lib/utils';

interface CandyCellProps {
  candy: Candy | null;
  isSelected: boolean;
  onClick: () => void;
  row: number;
  col: number;
  stabilizerMode?: boolean;
}

export default function CandyCell({ candy, isSelected, onClick, stabilizerMode }: CandyCellProps) {
  if (!candy) {
    return <div className="w-12 h-12 sm:w-14 sm:h-14" />;
  }

  const config = CANDY_CONFIG[candy.type];
  const isSpecial = candy.isSpecial;
  const showUnstable = candy.isUnstable && !candy.isStabilized;
  const showStabilized = candy.isUnstable && candy.isStabilized;
  const isLowCountdown = showUnstable && (candy.unstableStepsLeft ?? 0) <= 1;

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl sm:text-3xl relative',
        'transition-all duration-200 transform',
        'hover:scale-110 active:scale-95',
        'shadow-md hover:shadow-lg',
        isSelected && 'ring-4 ring-white ring-opacity-80 scale-110 z-10',
        candy.isMatched && 'animate-pulse scale-0 opacity-0',
        candy.isFalling && 'animate-bounce',
        isSpecial && 'animate-pulse',
        showUnstable && 'ring-2 ring-orange-400 ring-offset-1',
        isLowCountdown && 'ring-2 ring-red-500 ring-offset-1 animate-pulse',
        showStabilized && 'ring-2 ring-cyan-400 ring-offset-1',
        stabilizerMode && candy.isUnstable && !candy.isStabilized && 'ring-2 ring-yellow-300 cursor-pointer'
      )}
      style={{
        background: isSpecial && candy.specialType === 'rainbow'
          ? 'linear-gradient(135deg, #FF6B9D, #FFD93D, #6BCB77, #4D96FF, #9B59B6)'
          : config.color,
        boxShadow: isSelected
          ? `0 0 20px ${config.color}, 0 4px 6px rgba(0,0,0,0.2)`
          : showUnstable
          ? `0 0 8px rgba(255,165,0,0.5), 0 4px 6px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3)`
          : `0 4px 6px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3)`,
      }}
    >
      <span className="drop-shadow-md">{config.emoji}</span>

      {showUnstable && (
        <span
          className={cn(
            'absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm',
            isLowCountdown ? 'bg-red-500 animate-bounce' : 'bg-orange-400'
          )}
        >
          {candy.unstableStepsLeft}
        </span>
      )}

      {showStabilized && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs bg-cyan-400 shadow-sm">
          🔒
        </span>
      )}
    </button>
  );
}
