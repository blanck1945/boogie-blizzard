import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-200">
      <main className="flex flex-1 overflow-hidden">{children}</main>
    </div>
  );
};
