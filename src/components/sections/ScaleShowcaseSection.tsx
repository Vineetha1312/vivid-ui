/**
 * Pixel/behavior-accurate: loader animates smoothly per section, resets only on section switch (never flickers).
 * Image transition and expanded text animate smoothly. Left/right sections are visually separated.
 */
import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
const SECTIONS = [
  {
    title: 'Roles & Permissions',
    description: 'Granular control for scaling teams. Set access, assign roles, and keep your data protected.',
    badge: 'NEW',
    imageUrl: 'https://i.imgur.com/9Sfwj9b.png',
  },
  {
    title: 'Real-time Error Logging & Tracing',
    description: 'Debug at enterprise scale with live log view and error insight. Recover faster.',
    badge: null,
    imageUrl: 'https://i.imgur.com/mE6Mujy.png',
  },
  {
    title: 'Release Cycle Control & Instant Rollback',
    description: 'Ship code confidently, schedule deploys, and roll back instantly if issues arise.',
    badge: null,
    imageUrl: 'https://i.imgur.com/m3gw6dQ.png',
  },
  {
    title: 'Managed Infra or Self-Hosted',
    description: 'Choose managed infrastructure or deploy on-premise for advanced compliance.',
    badge: null,
    imageUrl: 'https://i.imgur.com/JwYXlch.png',
  },
  {
    title: 'disconnected',
    description: '',
    badge: null,
    imageUrl: 'https://i.imgur.com/JwYXlch.png',
  }
];

const DISPLAY_DURATION = 8000; // 8 seconds

export const ScaleShowcaseSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0); // 0-100
  const progressRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Correct loader animation: it only resets AFTER the next section appears, not before
  useEffect(() => {
    let start = Date.now();
    let isManual = false;
      setProgress(0);

    function animate() {
      const elapsed = Date.now() - start;
      const value = Math.min((elapsed / DISPLAY_DURATION) * 100, 100);
      setProgress(value);

      if (value < 100) {
        progressRef.current = window.requestAnimationFrame(animate);
      } else {
        timeoutRef.current = window.setTimeout(() => {
          // Don't reset progress yet, let the new section be rendered first
          setActiveIdx((idx) => (idx + 1) % SECTIONS.length);
        }, 200); // Optional: slight dwell so 100% bar is visible very briefly
    }
    }
    progressRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
  }, [activeIdx]);

  // Manual selection
  const handleSectionClick = (index: number) => {
    if (index !== activeIdx) {
      // Clearing will make loader restart from 0 in useEffect (on section change)
      setActiveIdx(index);
      // No need to manually reset progress, useEffect will handle on index change
    }
};

  return (
    <section className="py-16 md:py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Scale Up Fast and Safely"
          subtitle="Built for modern teams who want security, observability, and release velocity."
          className="mb-16"
        />

        <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-stretch w-full min-h-[420px]">
          {/* Left panel: vertical nav, loader only for current */}
          <div className="relative z-10 w-full md:w-80 max-w-full md:max-w-xs flex-shrink-0">
            <div className="flex flex-col gap-2 w-full">
              {SECTIONS.map((section, i) => {
                const isActive = i === activeIdx;
                return (
                  <motion.button
                    key={section.title + i}
                    layout
                    transition={{ layout: { duration: 0.4, type: 'spring' } }}
                    className={`group relative flex flex-col px-5 py-4 rounded-xl text-left transition-all duration-300 
                      ${isActive
                        ? 'bg-card border border-primary shadow-lg'
                        : 'bg-transparent border border-transparent hover:bg-card/80 hover:border-muted'}
                    `}
                    style={{
                      minHeight: isActive ? 110 : 56,
                      boxShadow: isActive ? '0 5px 32px 0 rgba(0,0,0,0.18)' : undefined,
                    }}
                    onClick={() => handleSectionClick(i)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-semibold text-base md:text-lg text-foreground tracking-tight`}>
                        {section.title}
                      </span>
                      {section.badge && (
                        <span className="ml-2 bg-primary text-primary-foreground text-xs px-2.5 py-0.5 rounded-full font-medium shadow-sm">{section.badge}</span>
                      )}
                    </div>
                    {/* Expand/collapse animated content */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="desc"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.46, 0.03, 0.52, 0.96] }}
                          className="overflow-hidden"
                        >
                          <div className="mb-1 text-muted-foreground text-sm md:text-base flex-1 min-h-[20px]">
                            {section.description}
                          </div>
                          {/* Progress loader bar */}
                          <div className="w-full h-1 rounded bg-muted/60 mt-2 relative overflow-hidden">
                            <motion.div
                              className="h-full rounded bg-primary"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{
                                duration: 0.25,
                                ease: 'linear'
                              }}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>
          
          {/* Right panel: always stretches, image transitions smoothly */}
          <div className="grow relative flex items-center min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIdx}
                initial={{ opacity: 0, scale: 1.035, x: 24, filter: 'blur(12px)' }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.98, x: -18, filter: 'blur(12px)' }}
                transition={{ duration: 0.6, ease: [0.36, 0.66, 0.04, 1] }}
                src={SECTIONS[activeIdx].imageUrl}
                alt={SECTIONS[activeIdx].title}
                className="w-full h-[320px] sm:h-[400px] md:h-[440px] object-cover rounded-2xl shadow-md border border-border bg-black/80 transition-colors duration-300"
                style={{
                  maxHeight: '60vh',
                  minHeight: '220px',
                  width: '100%',
                }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};