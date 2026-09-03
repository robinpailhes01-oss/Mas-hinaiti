/** Le seul ornement du site : une vague tracée à la main. */
export default function Vague({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="60"
      height="14"
      viewBox="0 0 60 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 7c5-8 9-8 14 0s9 8 14 0 9-8 14 0 9 8 14 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
