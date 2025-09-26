export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-900 text-white">Sidebar di sini</aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
