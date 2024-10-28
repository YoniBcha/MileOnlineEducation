const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="max-w-screen-2xl mx-auto w-full xl:px-20 px-5 py-4">
        {children}
      </main>
    </>
  );
};

export default Container;
