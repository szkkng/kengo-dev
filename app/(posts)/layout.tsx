const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <article className='post mt-10'>{children}</article>;
};

export default Layout;
