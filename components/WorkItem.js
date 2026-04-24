export default function WorkItem({ index, name, tag, tagClass, meta, desc, bullets, impact }) {
  return (
    <details className="p-work-item">
      <summary className="p-work-summary">
        <span className="p-work-idx">{index}</span>
        <span className="p-work-name">{name}</span>
        <span className={`p-work-tag ${tagClass}`}>{tag}</span>
        <span className="p-work-chevron">›</span>
      </summary>
      <div className="p-work-body">
        <div className="p-work-body-inner">
          <div className="p-work-meta">{meta}</div>
          <p className="p-work-desc">{desc}</p>
          <ul className="p-work-bullets">
            {bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
          {impact && <div className="p-work-impact">{impact}</div>}
        </div>
      </div>
    </details>
  )
}
