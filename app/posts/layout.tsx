const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <article className='prose mt-6'>{children}</article>;
};

export default Layout;
