export default function blockStyles(contentBlock) {
  const type = contentBlock.getType();

  if (type === 'blockquote') {
    return 'superFancyBlockquote';
  }
  if (type === 'code-block') {
    return 'text-area__code-block';
  }

  return '';
}
