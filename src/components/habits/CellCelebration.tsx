import { motion } from 'framer-motion';

interface CellCelebrationProps {
  type: 'done' | 'skip';
}

/**
 * Micro-animation played when a habit cell transitions into
 * a positive state. Kept gentle to match the "observation over
 * optimization" philosophy — sparkles + a tiny rocket, no loud burst.
 */
export function CellCelebration({ type }: CellCelebrationProps) {
  const particles = type === 'done'
    ? ['⭐', '✨', '·', '✦', '·', '✨']
    : ['🌱', '·', '✦', '·', '✨', '·'];

  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {/* Soft ring pulse */}
      <motion.span
        initial={{ scale: 0.6, opacity: 0.7 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`absolute inset-0 rounded-md sm:rounded-xl border-2 ${
          type === 'done' ? 'border-primary/60' : 'border-accent/60'
        }`}
      />

      {/* Radiating particles */}
      {particles.map((p, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = 22;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
            animate={{ x, y, opacity: [0, 1, 0], scale: [0.4, 1, 0.6] }}
            transition={{ duration: 0.75, delay: i * 0.02, ease: 'easeOut' }}
            className="absolute text-[10px] sm:text-xs"
          >
            {p}
          </motion.span>
        );
      })}

      {/* Tiny rocket flying by (only for done) */}
      {type === 'done' && (
        <motion.span
          initial={{ x: -40, y: 18, opacity: 0, rotate: -20 }}
          animate={{ x: 40, y: -18, opacity: [0, 1, 1, 0], rotate: -20 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute text-[11px] sm:text-sm"
        >
          🚀
        </motion.span>
      )}
    </span>
  );
}
