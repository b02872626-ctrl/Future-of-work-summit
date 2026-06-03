/* eslint-disable @next/next/no-img-element */

export type ShardVariant = "planet" | "sparkle" | "burst" | "arrow";

const SRC: Record<ShardVariant, string> = {
  planet:  "/shards/planet.png",   // hero / join
  sparkle: "/shards/sparkle.png",  // Afriwork AI
  burst:   "/shards/burst.png",    // What's next
  arrow:   "/shards/arrow.png",    // About the summit
};

export function Shard({
  variant = "planet",
  className = "",
}: {
  variant?: ShardVariant;
  className?: string;
}) {
  return (
    <img
      src={SRC[variant]}
      alt=""
      aria-hidden="true"
      className={className}
      draggable={false}
    />
  );
}
