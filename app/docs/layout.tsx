import { Sidebar } from "./components/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-5">
      <div className="flex gap-10">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-10 lg:block">
          <Sidebar />
        </aside>
        <div className="min-w-0 flex-1 py-10">
          <article className="prose max-w-2xl">{children}</article>
        </div>
      </div>
    </div>
  );
}
