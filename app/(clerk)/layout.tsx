const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex justify-center items-center h-screen">
        <section className="">{children}</section>
      </main>
    </>
  );
};

export default ClerkLayout;