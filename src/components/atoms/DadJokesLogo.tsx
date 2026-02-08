import type { SVGProps } from "react";

export default function DadJokesLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="DadJokes logo"
      {...props}
    >
      <path
        d="M14 14c0-3.314 2.686-6 6-6h24c3.314 0 6 2.686 6 6v18c0 3.314-2.686 6-6 6H31.5L21 48.5V38H20c-3.314 0-6-2.686-6-6V14Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M15 25c3 0 5 2 6 4 1-2 3-4 6-4s5 1.5 6 3.5c1-2 3-3.5 6-3.5 4.5 0 8 3.5 8 7 0 0-4.5 1.5-9 1.5-4.5 0-7-2-7-5 0 3-2.5 5-7 5s-9-1.5-9-1.5c0-3.5 3.5-7 8-7Z"
        fill="currentColor"
      />
      <path
        d="M22 22c2-2 5-2 7 0M35 22c2-2 5-2 7 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
