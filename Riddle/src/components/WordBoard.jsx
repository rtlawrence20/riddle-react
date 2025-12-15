import { useMemo, useState } from "react";
import { CARD_SURFACE, TITLE_MD, TEXT_MUTED, INPUT, BUTTON, STACK_SM } from "../app/styles.js";

const TILE =
    "flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-900/70 bg-emerald-950/20 text-lg font-semibold text-emerald-50";

export default function WordBoard({ letters, finalWord, isUnlocked, onFinalSolved }) {
    const [guess, setGuess] = useState("");
    const [status, setStatus] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isSolved, setIsSolved] = useState(false);

    const masked = useMemo(() => letters.map((c) => (c ? c : "")), [letters]);

    function submitFinal() {
        if (!isUnlocked) {
            setStatus("Solve all puzzles to unlock the final answer.");
            return;
        }

        if (hasSubmitted) {
            setStatus("You already submitted your final answer.");
            return;
        }

        const normalizedGuess = guess.trim().toUpperCase();
        const normalizedTarget = String(finalWord).trim().toUpperCase();

        if (normalizedGuess.length !== 5) {
            setStatus("Final answer must be 5 letters.");
            return;
        }

        setHasSubmitted(true);

        if (normalizedGuess === normalizedTarget) {
            setIsSolved(true);
            setStatus("Final answer correct.");
            onFinalSolved?.();
            return;
        }

        setStatus("Final answer incorrect.");
    }

    const isLocked = !isUnlocked;
    const disableInput = isLocked || hasSubmitted || isSolved;

    return (
        <div className={CARD_SURFACE}>
            <div className={STACK_SM}>
                <div className={TITLE_MD}>Final Word</div>
                <div className={TEXT_MUTED}>
                    Each solved puzzle reveals one letter. One final submission.
                </div>

                <div className="flex gap-2 pt-2">
                    {masked.map((c, i) => (
                        <div key={i} className={TILE}>
                            {c}
                        </div>
                    ))}
                </div>

                <div className="pt-3 space-y-2">
                    <input
                        className={INPUT}
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        placeholder={isLocked ? "Locked" : "Enter final 5-letter word"}
                        disabled={disableInput}
                    />
                    <button
                        className={BUTTON}
                        onClick={submitFinal}
                        disabled={disableInput}
                    >
                        Submit Final
                    </button>
                </div>

                <div className="text-sm text-emerald-100/70">{status}</div>
            </div>
        </div>
    );
}
