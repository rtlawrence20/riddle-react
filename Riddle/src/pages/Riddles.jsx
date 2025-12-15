// src/pages/Riddles.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GAME } from "../app/data.js";
import { clearAuth, getAuth } from "../app/auth.js";
import RiddleCard from "../components/RiddleCard.jsx";
import WordBoard from "../components/WordBoard.jsx";
import GiftModal from "../components/GiftModal.jsx";
import {
    PAGE_CONTAINER,
    PAGE_WRAPPER,
    PANEL_SURFACE,
    TITLE_XL,
    TEXT_MUTED,
    BUTTON,
    ROW_BETWEEN,
} from "../app/styles.js";

function getInitialState() {
    const count = GAME?.riddles?.length ?? 5;
    const solved = Array.from({ length: count }, () => false);
    const letters = Array.from({ length: count }, () => "");
    return { solved, letters };
}

export default function Riddles() {
    const navigate = useNavigate();
    const { username } = getAuth();
    const [isGiftOpen, setIsGiftOpen] = useState(false);

    const [{ solved, letters }, setGameState] = useState(getInitialState);

    const isUnlocked = useMemo(() => solved.every(Boolean), [solved]);

    function logout() {
        clearAuth();
        navigate("/");
    }

    function markSolved(index) {
        setGameState((prev) => {
            if (prev.solved[index]) return prev;

            const nextSolved = [...prev.solved];
            nextSolved[index] = true;

            const nextLetters = [...prev.letters];
            nextLetters[index] = GAME.riddles[index]?.givesLetter ?? "";

            return { solved: nextSolved, letters: nextLetters };
        });
    }

    return (
        <div className={PAGE_CONTAINER}>
            <div className={PAGE_WRAPPER}>
                <div className={PANEL_SURFACE}>
                    <div className={ROW_BETWEEN}>
                        <div>
                            <div className={TITLE_XL}>Riddles</div>
                            <div className={TEXT_MUTED}>Logged in as: {username}</div>
                        </div>
                        <button className={BUTTON} onClick={logout}>
                            Log out
                        </button>
                    </div>
                </div>

                {GAME.intro && (
                    <div className={PANEL_SURFACE}>
                        <div className={TITLE_XL}>Intro</div>
                        <div className={`${TEXT_MUTED} whitespace-pre-line pt-2`}>
                            {GAME.intro}
                        </div>
                    </div>
                )}

                <div className="grid gap-4">
                    {GAME.riddles.map((r, i) => (
                        <RiddleCard
                            key={r.id}
                            index={i}
                            title={r.title}
                            hint={r.hint}
                            expectedAnswers={r.answers}
                            type={r.type}
                            targetMiles={r.targetMiles}
                            toleranceMiles={r.toleranceMiles}
                            unitLabel={r.unitLabel}
                            isSolved={solved[i]}
                            onSolve={() => markSolved(i)}
                        />

                    ))}
                </div>

                <WordBoard
                    letters={letters}
                    finalWord={GAME.finalWord}
                    isUnlocked={isUnlocked}
                    onFinalSolved={() => setIsGiftOpen(true)}
                />

                <GiftModal
                    isOpen={isGiftOpen}
                    onClose={() => setIsGiftOpen(false)}
                />


            </div>
        </div>
    );
}
