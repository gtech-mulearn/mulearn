export function Section({ title, children, className = "" }) {
  return (
    <div className={`space-y-4 text-left ${className}`}>
      <h2 className="text-xl font-semibold text-[#ff6b33] m-0 text-left">
        {title}
      </h2>
      {children}
    </div>
  );
}
