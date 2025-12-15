export const GAME = {
    allowedUsername: "Michel Cox",
    finalWord: "BOOKS",
    intro: `Another year has come and gone,
And our friendship still lives on.
Your present waits—wrapped up with cheer—
But first, a little game this year.

Before you open what’s tucked away,
Five puzzles stand in Michael’s way.
Solve each one with wit and flair,
And earn a letter hidden there.

When all five letters you have won,
Your final challenge has begun—
Arrange them like a Wordle clue,
To spell the gift I got for you.

Take your time, be smart and clever…
Solve them all to claim your treasure!`,
    riddles: [
        {
            id: "p1",
            title: "Puzzle 1",
            hint: `You tease me for my Swiftie ways,
Yet still I love her all my days.
You claim you tolerate it—barely so—
But here’s a fact you ought to know.

To earn your very first clue’s fame,
Tell me Taylor Swift’s middle name.`,
            answers: ["allison"],
            givesLetter: "O",
        },
        {
            id: "p2",
            title: "Puzzle 2",
            hint: `You have stuck with me through all the highs and lows,
My many anxieties and parenting woes.
Edith is my [blank] as
Camila is your [blank]`,
            answers: ["scrunch", "smooches"],
            givesLetter: "S",
        },
        {
            id: "p3",
            title: "Puzzle 3",
            hint: `Rounds are a time for wit and delight,
Quotes galore as we try to start fights.

You started off 2025 strong,
Pointing out all that could go wrong.

What is the nightmare that I speak?`,
            answers: ["polygamy"],
            givesLetter: "O",
        },
        {
            id: "p4",
            title: "Puzzle 4",
            hint: `I’ve always loved our shared sense of nerd,
Our fun little facts, well known to be heard.

On this very day, I shared with you
That your dear Orwell learned from Huxley too—
Oui, it’s true!

But now comes the question, don’t miss the gist:
Who sat in the charting room, laughing at this?`,
            answers: ["beth botts"],
            givesLetter: "B",
        },
        {
    id: "p5",
    title: "Puzzle 5",
    hint: `Near,
Far,
Wherever you are,
I’ll probably text you in five minutes.

As inseparable as we are today,
It wasn’t always quite this way.
Before our paths could intertwine,
How far apart were birth cities of mine and thine?`,
    type: "number",
    targetMiles: 2529,
    toleranceMiles: 200,
    unitLabel: "miles",
    answers: ["__numeric__"],
    givesLetter: "K",
},

    ],
};

export function normalize(value) {
    return String(value ?? "")
        .trim()
        .toLowerCase();
}
