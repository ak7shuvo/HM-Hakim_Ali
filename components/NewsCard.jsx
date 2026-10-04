// Editorial card for one media item. Every field comes from lib/news.js (the News & Media dossier).
export default function NewsCard({ item }) {
  const [primary, ...rest] = item.categories;
  return (
    <article className="card card-hover news-card" id={item.id} aria-labelledby={`${item.id}-h`}>
      <header className="news-head">
        <p className="news-pub">{item.publication}</p>
        <time className="meta" dateTime={item.date}>{item.dateLabel}</time>
      </header>
      <h3 className="news-title" id={`${item.id}-h`}>{item.headline}</h3>
      <p className="news-summary">{item.summary}</p>
      <p className="news-topic"><span className="meta">Topic</span> {item.topic}</p>
      <footer className="news-foot">
        <ul className="news-tags" aria-label="Categories">
          <li className="news-tag is-primary">{primary}</li>
          {rest.map((c) => <li key={c} className="news-tag">{c}</li>)}
        </ul>
        <a className="news-read" href={item.url} target="_blank" rel="noopener noreferrer">
          <span>Read full article</span>
          <span aria-hidden="true" className="news-arrow">↗</span>
          <span className="visually-hidden">: “{item.headline}”, {item.source || item.publication} (opens in a new tab)</span>
        </a>
      </footer>
    </article>
  );
}
