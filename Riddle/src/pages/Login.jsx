import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GAME, normalize } from "../app/data.js";
import { setAuth } from "../app/auth.js";
import { PAGE_CONTAINER, PAGE_WRAPPER, PANEL_SURFACE, TITLE_XL, TEXT_MUTED, INPUT, BUTTON, STACK_SM } from "../app/styles.js";

export default function Login() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();

        const normalized = normalize(username);
        const allowed = normalize(GAME.allowedUsername);

        if (normalized === allowed) {
            setAuth({ isAuthed: true, username: normalized });
            navigate("/riddles");
            return;
        }

        setError("Username not recognized.");
    }

    return (
        <div className={PAGE_CONTAINER}>
            <div className={PAGE_WRAPPER}>
                <div className={PANEL_SURFACE}>
                    <div className={STACK_SM}>
                        <div className={TITLE_XL}>Login</div>
                        <div className={TEXT_MUTED}>
                            Enter the one allowed username to unlock the riddles.
                        </div>

                        <form onSubmit={onSubmit} className="space-y-3 pt-2">
                            <input
                                className={INPUT}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                            <button className={BUTTON} type="submit">
                                Enter
                            </button>
                        </form>

                        {error && <div className="text-sm text-red-400">{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
