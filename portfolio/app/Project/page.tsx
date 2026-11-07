
import MobileProject from "@/components/Mobile/MobileProject";


export default function Project() {
  return (
    <>
      <div className="md:hidden">
        <MobileProject />
      </div>

      <div className="hidden md:block">
        {/* <DesktopProject /> */}
      </div>
    </>
  );
}
