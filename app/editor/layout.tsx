export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0d0e12] text-white">
      <div>{children}</div>
    </div>
  );
}
