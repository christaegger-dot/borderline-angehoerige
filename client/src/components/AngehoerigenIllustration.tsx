interface Props {
  name: string;
  alt: string;
  caption: string;
  eager?: boolean;
}

/** Supplied illustrations accompany the explanation; no essential text is embedded. */
export default function AngehoerigenIllustration({
  name,
  alt,
  caption,
  eager = false,
}: Props) {
  return (
    <figure className="angehoerigen-illustration">
      <img
        src={`/puk/illustrations/${name}.webp`}
        alt={alt}
        width={1200}
        height={800}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
