interface IllustrationProps {
  className?: string;
  ariaLabel?: string;
}
export default function EisbergIllustration({
  className,
  ariaLabel,
}: IllustrationProps) {
  return (
    <img
      src="/puk/eisberg.svg"
      alt={ariaLabel ?? ""}
      aria-hidden={ariaLabel ? undefined : true}
      className={className}
      width="480"
      height="320"
      decoding="async"
    />
  );
}
