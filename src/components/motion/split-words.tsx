import {Fragment} from "react";

// Renders each word as an inline-block span so headings can be revealed word by word.
// Words wrapped in *asterisks* in the translations render as the italic serif accent.
// Server-rendered on purpose: no DOM mutation on the client, no hydration mismatch.
export function SplitWords({text}: {text: string}) {
  let accent = false;

  return text.split(" ").map((raw, i) => {
    const opens = raw.startsWith("*");
    const closes = raw.endsWith("*") && (raw.length > 1 || accent);
    if (opens) accent = true;
    const isAccent = accent;
    if (closes) accent = false;
    const word = raw.replace(/^\*|\*$/g, "");

    return (
      <Fragment key={i}>
        {i > 0 ? " " : null}
        <span className={isAccent ? "split-word accent" : "split-word"} style={{"--i": i} as React.CSSProperties}>{word}</span>
      </Fragment>
    );
  });
}
