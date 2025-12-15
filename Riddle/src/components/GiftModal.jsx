import { useEffect } from "react";
import confetti from "canvas-confetti";

const overlayClass =
    "fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4";
const modalClass =
    "w-full max-w-md rounded-3xl border border-emerald-900/60 bg-emerald-950/80 p-6 shadow-xl shadow-emerald-950/50";
const closeButtonClass =
    "rounded-xl border border-emerald-900/70 bg-emerald-950/40 px-4 py-2 text-sm font-medium text-emerald-50 hover:bg-emerald-950/60";

function fireConfetti() {
    const end = Date.now() + 1100;

    (function frame() {
        confetti({
            particleCount: 5,
            spread: 70,
            startVelocity: 35,
            ticks: 120,
            origin: { x: 0.2, y: 0.2 },
        });
        confetti({
            particleCount: 5,
            spread: 70,
            startVelocity: 35,
            ticks: 120,
            origin: { x: 0.8, y: 0.2 },
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function PresentIcon() {
    return (
        <svg
            viewBox="0 0 128 128"
            className="h-28 w-28"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="box" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#065f46" />
                    <stop offset="1" stopColor="#064e3b" />
                </linearGradient>
                <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#be123c" />
                    <stop offset="1" stopColor="#9f1239" />
                </linearGradient>
            </defs>

            <rect x="18" y="50" width="92" height="62" rx="10" fill="url(#box)" />
            <rect x="58" y="50" width="12" height="62" fill="url(#ribbon)" />
            <rect x="18" y="72" width="92" height="12" fill="url(#ribbon)" />

            <rect x="20" y="36" width="88" height="20" rx="8" fill="#0b3d2e" />
            <rect x="58" y="36" width="12" height="20" fill="url(#ribbon)" />

            <path
                d="M64 34c-10-18-28-16-28-6 0 10 16 14 28 6Z"
                fill="#be123c"
            />
            <path
                d="M64 34c10-18 28-16 28-6 0 10-16 14-28 6Z"
                fill="#be123c"
            />
        </svg>
    );
}

export default function GiftModal({ isOpen, onClose }) {
    useEffect(() => {
        if (!isOpen) return;
        fireConfetti();
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={overlayClass} role="dialog" aria-modal="true">
            <div className={modalClass}>
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="animate-bounce">
                        <PresentIcon />
                    </div>

                    <div className="text-2xl font-semibold tracking-tight text-emerald-50">
                        You did it.
                    </div>
                    <div className="text-sm text-emerald-100/70">
                        Open your present now.
                    </div>

                    <button className={closeButtonClass} onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
