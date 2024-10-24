export function TypographyH1({ content, color, size }) {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-${size} ${color}`}
    >
      {content}
    </h1>
  );
}
