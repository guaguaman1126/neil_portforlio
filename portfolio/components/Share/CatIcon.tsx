import Image from "next/image";

type CatIconProps = {
  className?: string;
};

export default function CatIcon({ className }: CatIconProps) {
  return (
    <div
      className={`relative fill aspect-square overflow-hidden rounded-[15%] bg-[#91CAC4] `}
    >
      <Image
        src="/電腦貓貓.webp"
        alt="貓咪在使用電腦"
        fill
        // sizes="25vw"
        loading="eager"
        style={{
          objectFit: "cover",
          // objectPosition: "85% 1000%",
          left: "-40%",
          top: "55%",
          transform: "scale(2.2)",
        }}
      />
    </div>
  );
}
