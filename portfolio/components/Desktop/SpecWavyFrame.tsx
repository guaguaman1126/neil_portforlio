import Image from "next/image";

type WavyFrameProps = {
  frameLength: "short" | "long";
  orientation: "horizontal" | "vertical";
  imageSrc: string;
  className?: string;
};

export default function SpecWavyFrame({
  frameLength,
  orientation,
  imageSrc,
  className,
}: WavyFrameProps) {

  const frameName = frameLength === "long" ? "長" : "短";
  const suffix = orientation === "vertical" ? "-直" : "-橫";
  const frameSrc = `/框/${frameName}框${suffix}.svg`;
  const maskSrc = `/框/${frameName}框${suffix}-mask.svg`;
  const [longSide, shortSide] = frameLength === "long" ? [984, 484] : [716, 486];
  const ratio = orientation === "horizontal" ? longSide / shortSide : shortSide / longSide;


  return (
    <div className={`flex h-full w-full items-center justify-center [container-type:size] ${className ?? ""}`}>
      {/* 以可用寬高中較小的限制，等比例縮放整組相框與照片。 */}
      <div
        className="relative transition-opacity duration-400 ease-in-out"
        style={{ width: `min(100cqw, ${100 * ratio}cqh)`, aspectRatio: ratio }}
      >
      <img
        src={frameSrc}
        alt="框"
        className="relative z-10 block h-auto w-full"
      />


      <Image
        src={imageSrc}
        alt="相框中的照片"
        fill
        unoptimized


        className="object-cover"
        style={{
          maskImage: `url("${maskSrc}")`,
          maskSize: "99% 99%",
          maskRepeat: "no-repeat",
          maskPosition: "center"
        }}
      />

      </div>
    </div>
  )
}
