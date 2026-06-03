/* eslint-disable @next/next/no-img-element */
export function IconDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`} aria-hidden="true">
      <img
        src="/svg/divider.svg"
        alt=""
        className="h-6 w-full"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>
  );
}
