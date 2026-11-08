
import DeskResume from "@/components/Desktop/DeskResume";
import MobileResume from "@/components/Mobile/MobileResume";


export default function Resume() {
  return (
    <>
      <div className="md:hidden">
        <MobileResume />
      </div>

      <div className="hidden md:block">
        <DeskResume />
      </div>
    </>
  );
}
