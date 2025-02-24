import { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  return (
    <header className="w-full mt-2 p-2 border-b">
      <nav className="flex items-center justify-between">
        <div>
          {children}
          <div></div>
        </div>
        <div className="flex items-center gap-2 cursor-pointer border-l pl-4 w-[210px]"></div>
      </nav>
    </header>
  );
}
