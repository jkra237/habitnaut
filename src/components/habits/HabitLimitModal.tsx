import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HabitLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HabitLimitModal({ isOpen, onClose }: HabitLimitModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed inset-x-4 top-1/3 -translate-y-1/2 z-50 mx-auto max-w-md"
          >
            <div className="bg-card rounded-3xl shadow-elevated p-6 space-y-6">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
                  <span className="text-3xl">🌱</span>
                </div>
              </div>

              {/* Content */}
              <div className="text-center space-y-4">
                <h3 className="text-xl font-serif font-medium text-foreground">
                  Habit limit reached
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    This is the free version of HabitNaut.
                  </p>
                  <p>
                    I hope you enjoy it.
                  </p>
                  <p>
                    If you want to add unlimited activities and get a lot more useful functions, please purchase HabitNaut Premium in your App Store.
                  </p>
                  <p>
                    This will support my project.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-center">
                <Button
                  variant="gentle"
                  onClick={onClose}
                  className="px-8"
                >
                  Got it
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
