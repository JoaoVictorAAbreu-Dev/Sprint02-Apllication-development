import type { PropsWithChildren } from 'react';

export const ContentShell = ({ children }: PropsWithChildren) => {
  return <section className="p-4 md:p-6">{children}</section>;
};
