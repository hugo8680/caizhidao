export function ConceptVisual({ type, label }: { type: string; label: string }) {
  return (
    <div className={`concept-visual visual-${type}`} aria-label={`${label}概念示意图`} role="img">
      <i /><i /><i /><i /><span>{label.slice(0, 1)}</span>
    </div>
  );
}
