/* eslint-disable @next/next/no-img-element */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/svg/logo.svg"
      alt="Future of Work Summit · Ethiopia"
      className={`h-9 w-auto md:h-10 ${className}`}
      draggable={false}
    />
  );
}
