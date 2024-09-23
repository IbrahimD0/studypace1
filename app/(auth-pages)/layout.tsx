export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-full h-full flex flex-col gap-12  justify-center items-center">{children}</div>
  );
}
