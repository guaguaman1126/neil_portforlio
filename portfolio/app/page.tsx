import DeskHome from "@/components/Desktop/DeskHome";
import MobileHome from "@/components/Mobile/MobileHome";


export default function Home() {

  return (
    <>
      <div className="md:hidden">
        <MobileHome />
      </div>

      <div className="hidden md:block">
        <DeskHome />
      </div>
    </>
  );

}
