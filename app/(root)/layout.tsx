import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className="py-6 md:py-12 max-w-4xl px-4 lg:px-0 mx-auto">
        {children}
      </main>
    </div>
  );
}
