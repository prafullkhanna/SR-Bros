/**
 * Renders a JSON-LD block. Server component — the payload is inlined into the
 * HTML so crawlers see it without executing JavaScript.
 */
export function StructuredData({ data }: { data: object | null }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      // The payload is built from static, trusted content in src/content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
