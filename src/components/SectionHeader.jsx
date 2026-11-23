export default function SectionHeader({ title, children }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}
