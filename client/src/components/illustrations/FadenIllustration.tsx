interface IllustrationProps {
  className?: string;
  ariaLabel?: string;
}
export default function FadenIllustration({
  className,
  ariaLabel,
}: IllustrationProps) {
  return (
    <img
      src="/puk/faden.svg"
      alt={ariaLabel ?? ""}
      aria-hidden={ariaLabel ? undefined : true}
      className={className}
      width="480"
      height="320"
      decoding="async"
    />
  );
}
