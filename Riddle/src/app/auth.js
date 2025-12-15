const AUTH_KEY = "riddleReact:isAuthed";
const USER_KEY = "riddleReact:username";

export function getAuth() {
    return {
        isAuthed: localStorage.getItem(AUTH_KEY) === "true",
        username: localStorage.getItem(USER_KEY) || "",
    };
}

export function setAuth({ isAuthed, username }) {
    localStorage.setItem(AUTH_KEY, String(Boolean(isAuthed)));
    localStorage.setItem(USER_KEY, username || "");
}

export function clearAuth() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
}
