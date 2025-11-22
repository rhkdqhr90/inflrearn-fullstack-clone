import InstructorPageNme from "./_components/instructor-page-name";
import InstructorSidebar from "./_components/instructor-sidebar";
import InstructorPage from "./page";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <InstructorPageNme></InstructorPageNme>

      <div className="flex w-6xl mx-auto">
        <InstructorSidebar></InstructorSidebar>
        {children}
      </div>
    </div>
  );
}
