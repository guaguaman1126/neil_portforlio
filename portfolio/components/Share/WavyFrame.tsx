import Image from "next/image";

type WavyFrameProps = {
  frameLength: "short" | "long";
  orientation: "horizontal" | "vertical";
  imageSrc: string;
  className?: string;
};

export default function WavyFrame({
  frameLength,
  orientation,
  imageSrc,
  className,
}: WavyFrameProps) {

  const frameName = `${frameLength}-frame-${orientation}`;
  const frameSrc = `/frame/${frameName}.svg`;
  const maskSrc = `/frame/${frameName}-mask.svg`;


  return (
    <div className={`relative w-full flex justify-center transition-opacity duration-400 ease-in-out ${className}`}>
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
  )
}
