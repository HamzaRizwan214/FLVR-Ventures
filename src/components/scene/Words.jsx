import { Fragment } from "react";

// Splits a line of text into words, each inside its own clipping mask, so a word can slide up out
// of nothing (no fade). `group` names the set so the scene can pick the words up by class:
// .sc-in--<group>. Works for Arabic too: it only ever splits on spaces, never inside a word.
export default function Words({ text, group }) {
  const words = text.split(/\s+/).filter(Boolean);
  return words.map((word, i) => (
    <Fragment key={i}>
      <span className="sc-w">
        <span className={`sc-in sc-in--${group}`}>{word}</span>
      </span>
      {i < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

// Wraps any element in a clipping mask so it can slide up the same way the words do.
export function Reveal({ group, className = "", children }) {
  return (
    <span className="sc-w">
      <span className={`sc-in sc-in--${group} ${className}`}>{children}</span>
    </span>
  );
}
