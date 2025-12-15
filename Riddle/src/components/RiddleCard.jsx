import { useEffect, useMemo, useState } from "react";
import {
    CARD_SURFACE,
    TITLE_MD,
    TEXT_MUTED,
    INPUT,
    BUTTON,
    STACK_SM,
    ROW_BETWEEN,
} from "../app/styles.js";
import { normalize } from "../app/data.js";

function parseMiles(raw) {
    const cleaned = String(raw ?? "")
        .toLowerCase()
        .replace(/miles?/g, "")
        .replace(/,/g, "")
        .trim();

    if (!cleaned) return null;

    const num = Number(cleaned);
    if (Number.isNaN(num)) return null;

    return num;
}

export default function RiddleCard({
    index,
    title,
    hint,
    expectedAnswers = [],
    type,
    targetMiles,
    toleranceMiles,
    unitLabel,
    isSolved,
    onSolve,
}) {
    const isNumericMiles = type === "number" && Number.isFinite(targetMiles);

    const answersCount = useMemo(() => {
        if (isNumericMiles) return 1;
        return Math.max(expectedAnswers?.length ?? 0, 1);
    }, [isNumericMiles, expectedAnswers]);

    const [values, setValues] = useState(() =>
        Array.from({ length: answersCount }, () => "")
    );
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        setValues((prev) => {
            if (prev.length === answersCount) return prev;
            return Array.from({ length: answersCount }, (_, i) => prev[i] ?? "");
        });
    }, [answersCount]);

    const disabled = Boolean(isSolved);

    const labels = useMemo(() => {
        if (isNumericMiles) return ["Distance"];
        if (answersCount === 1) return ["Answer"];
        return ["Blank 1", "Blank 2"];
    }, [answersCount, isNumericMiles]);

    function updateValue(i, next) {
        setValues((prev) => {
            const copy = [...prev];
            copy[i] = next;
            return copy;
        });
    }

    function handleCheck() {
        if (disabled) return;

        if (isNumericMiles) {
            const miles = parseMiles(values[0]);

            if (miles === null) {
                setFeedback("Enter a number.");
                return;
            }

            const tol = Number.isFinite(toleranceMiles) ? toleranceMiles : 0;
            const diff = Math.abs(miles - targetMiles);

            if (diff <= tol) {
                setFeedback("Correct.");
                onSolve?.();
                return;
            }

            setFeedback(`Close, but not within ${tol} miles. Try again.`);
            return;
        }

        if (!expectedAnswers || expectedAnswers.length === 0) {
            setFeedback("This puzzle is missing its expected answers.");
            return;
        }

        const normalizedInputs = values.map(normalize);

        const hasEmpty = normalizedInputs.some((v) => !v);
        if (hasEmpty) {
            setFeedback("Fill in all answer boxes first.");
            return;
        }

        const allCorrect = normalizedInputs.every((v, i) => {
            const target = normalize(expectedAnswers[i]);
            return v === target;
        });

        if (allCorrect) {
            setFeedback("Correct.");
            onSolve?.();
            return;
        }

        setFeedback("Not quite. Try again.");
    }

    return (
        <div className={CARD_SURFACE}>
            <div className={STACK_SM}>
                <div className={TITLE_MD}>{title || `Puzzle ${index + 1}`}</div>

                <div className={`${TEXT_MUTED} whitespace-pre-line`}>{hint}</div>

                <div className={STACK_SM}>
                    {values.map((val, i) => (
                        <div key={i} className={STACK_SM}>
                            <label className="text-sm text-gray-300">
                                {labels[i] || `Answer ${i + 1}`}
                            </label>

                            {isNumericMiles ? (
                                <div className="flex items-center gap-3">
                                    <input
                                        className={INPUT}
                                        value={val}
                                        onChange={(e) => updateValue(i, e.target.value)}
                                        placeholder={disabled ? "Solved" : "Enter number"}
                                        disabled={disabled}
                                        inputMode="numeric"
                                    />
                                    <div className="text-sm text-gray-300">
                                        {unitLabel || "miles"}
                                    </div>
                                </div>
                            ) : (
                                <input
                                    className={INPUT}
                                    value={val}
                                    onChange={(e) => updateValue(i, e.target.value)}
                                    placeholder={disabled ? "Solved" : "Type your answer"}
                                    disabled={disabled}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className={ROW_BETWEEN}>
                    <button className={BUTTON} onClick={handleCheck} disabled={disabled}>
                        {disabled ? "Solved" : "Check"}
                    </button>
                    <div className="text-sm text-gray-400">{feedback}</div>
                </div>
            </div>
        </div>
    );
}
