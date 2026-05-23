import type { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

function Main({ children }: MainProps) {
  return <main className="flex-1 bg-slate-50 px-6 py-6 dark:bg-slate-950">{children}</main>;
}

export default Main;
