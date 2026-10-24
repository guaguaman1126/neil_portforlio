import MobileHome from "@/components/Mobille/MobileHome";
import MobileMenu from "@/components/Mobille/MobileMenu";
import WavyFrame from "@/components/Share/WavyFrame";

export default function Home() {
  return (
    <div>
      {/* <WavyFrame
        frameLength="short"
        orientation="vertical"
        imageSrc="/電腦貓貓.webp"
        className="w-screen"
      />
      <WavyFrame
        frameLength="short"
        orientation="horizontal"
        imageSrc="/電腦貓貓.webp"
        className="w-screen"
      /> */}
      <MobileHome />
    </div>


  );
}
