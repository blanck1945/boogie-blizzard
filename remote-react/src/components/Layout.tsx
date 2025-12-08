import type { ReactNode } from "react";
import { Header } from "./Header";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-200">
      <Header />
      <main className="flex flex-1 overflow-hidden">{children}</main>
    </div>
  );
};
