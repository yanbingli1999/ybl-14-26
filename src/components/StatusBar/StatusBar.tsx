import useGameStore from '@/store/useGameStore';
import { Zap, Star, Coins, Footprints, BarChart3, RotateCcw, FlaskConical } from 'lucide-react';

export default function StatusBar() {
  const { score, moves, combo, maxCombo, profile, setShowStats, resetGame, stabilizers, stabilizerMode, toggleStabilizerMode } = useGameStore();

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-2xl p-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <Footprints className="w-5 h-5 text-white/80" />
            <div>
              <div className="text-xs text-white/70">剩余步数</div>
              <div className={`text-xl font-bold text-white ${moves <= 5 ? 'text-yellow-300 animate-pulse' : ''}`}>
                {moves}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-300" />
            <div>
              <div className="text-xs text-white/70">连击</div>
              <div className="text-xl font-bold text-yellow-300">
                {combo > 0 ? `x${combo}` : '-'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-white/80" />
            <div>
              <div className="text-xs text-white/70">得分</div>
              <div className="text-xl font-bold text-white">{score}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/20 rounded-xl px-3 py-2">
            <Coins className="w-5 h-5 text-yellow-300" />
            <div>
              <div className="text-xs text-white/70">金币</div>
              <div className="text-lg font-bold text-yellow-300">{profile.coins}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/20 rounded-xl px-3 py-2">
            <Star className="w-5 h-5 text-white" />
            <div>
              <div className="text-xs text-white/70">信誉</div>
              <div className="text-lg font-bold text-white">{profile.reputation}</div>
            </div>
          </div>

          <button
            onClick={toggleStabilizerMode}
            className={`relative p-2 rounded-xl transition-colors ${
              stabilizerMode
                ? 'bg-yellow-400 hover:bg-yellow-300'
                : stabilizers > 0
                ? 'bg-white/20 hover:bg-white/30'
                : 'bg-white/10 opacity-50 cursor-not-allowed'
            }`}
            title={stabilizerMode ? '取消稳定剂模式' : `使用稳定剂 (剩余 ${stabilizers})`}
          >
            <FlaskConical className={`w-5 h-5 ${stabilizerMode ? 'text-yellow-900' : 'text-white'}`} />
            {stabilizers > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 text-yellow-900 text-xs font-bold flex items-center justify-center">
                {stabilizers}
              </span>
            )}
          </button>

          <button
            onClick={() => setShowStats(true)}
            className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
            title="统计数据"
          >
            <BarChart3 className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={resetGame}
            className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
            title="重新开始"
          >
            <RotateCcw className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {stabilizerMode && (
        <div className="mt-2 text-center">
          <span className="inline-block px-4 py-1 bg-yellow-400 text-yellow-900 rounded-full font-bold text-sm animate-pulse">
            🔬 稳定剂模式已开启 - 点击不稳定糖果锁定类型
          </span>
        </div>
      )}

      {combo > 1 && (
        <div className="mt-2 text-center">
          <span className="inline-block px-4 py-1 bg-yellow-400 text-yellow-900 rounded-full font-bold text-sm animate-bounce">
            🔥 {combo} 连击！ +{Math.floor(combo * 10)} 额外分数
          </span>
        </div>
      )}

      {maxCombo > 0 && combo === 0 && (
        <div className="mt-2 text-center">
          <span className="text-xs text-white/60">
            本局最高连击: x{maxCombo}
          </span>
        </div>
      )}
    </div>
  );
}
