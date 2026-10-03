// Serialises structured data exactly as supplied. `<` and the JS line separators are escaped so the
// payload can never terminate the script element or break a parser; nothing is added to the data.
export default function JsonLd({ data }) {
  const json = data == null ? undefined : JSON.stringify(data);
  if (!json) return null;
  const safe = json.replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe }} />;
}
