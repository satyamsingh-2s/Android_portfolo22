"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Image as ImageIcon, X } from "lucide-react";

interface EventGalleryProps {
  title: string;
  images: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventGallery({ title, images, open, onOpenChange }: EventGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    setActiveIndex(0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
      if (event.key === "ArrowRight" && images.length > 1) {
        setActiveIndex((current) => (current + 1) % images.length);
      }
      if (event.key === "ArrowLeft" && images.length > 1) {
        setActiveIndex((current) => (current - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [images.length, onOpenChange, open]);

  useEffect(() => {
    if (!open || images.length <= 1) return;

    const nextIndex = (activeIndex + 1) % images.length;
    const nextImage = new Image();
    nextImage.src = images[nextIndex];
  }, [activeIndex, images, open]);

  const previous = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} event gallery`}
        >
          <motion.button
            type="button"
            aria-label="Close gallery"
            className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            className="relative z-10 w-full max-w-6xl overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated shadow-2xl"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24, scale: reduceMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 24, scale: reduceMotion ? 1 : 0.97 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4 sm:px-6">
              <div>
                <div className="font-mono-label text-[10px] text-text-tertiary">Event Gallery</div>
                <h4 className="mt-1 font-display text-lg font-semibold text-text-primary">{title}</h4>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="Close gallery"
                className="grid h-9 w-9 place-items-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:bg-bg-elevated-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative flex min-h-[55vh] items-center justify-center overflow-hidden bg-black/30 p-3 sm:p-5">
              {images.length === 0 ? (
                <div className="max-w-md px-6 py-16 text-center">
                  <ImageIcon className="mx-auto h-8 w-8 text-text-tertiary" />
                  <p className="mt-4 font-display text-base font-medium text-text-primary">Event photos are ready to be added.</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Add the event images to <code className="text-accent">public/images/athletics/</code> and list their paths in <code className="text-accent">src/lib/data.ts</code>.
                  </p>
                </div>
              ) : (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={images[activeIndex]}
                    src={images[activeIndex]}
                    alt={`${title} event photo ${activeIndex + 1}`}
                    className="max-h-[62vh] w-full rounded-xl object-contain"
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0, x: 34, scale: 0.985 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -34, scale: 0.985 }}
                    transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
              )}

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={previous}
                    aria-label="Previous event photo"
                    className="absolute left-5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur transition-transform hover:scale-105 hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next event photo"
                    className="absolute right-5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur transition-transform hover:scale-105 hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2 border-t border-border-subtle px-5 py-4">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={image}
                    aria-label={`Show event photo ${index + 1}`}
                    aria-current={activeIndex === index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === index ? "w-8 bg-accent" : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
