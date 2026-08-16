/**
 * Emit a structured-data block.
 *
 * The payload is always built from our own constants and translation files, so
 * there is no user input in the serialised JSON.
 */
export function JsonLd({ schema }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
