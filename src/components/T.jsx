import BilingualText from "./BilingualText";

// Renders a { en, ar } copy object in the active language.
export default function T({ t }) {
  return <BilingualText en={t.en} ar={t.ar} />;
}
