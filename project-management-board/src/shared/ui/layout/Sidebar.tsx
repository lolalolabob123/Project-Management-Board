export default function Sidebar() {
  return (
    <aside className="w-60 bg-white border-r border-gray-200 p-4">
      <nav className="space-y-2 text-sm">
        <a
          href="/board"
          className="block px-3 py-2 rounded hover:bg-gray-100"
        >
          Board
        </a>

        <a
          href="#"
          className="block px-3 py-2 rounded hover:bg-gray-100"
        >
          Projects
        </a>

        <a
          href="#"
          className="block px-3 py-2 rounded hover:bg-gray-100"
        >
          Settings
        </a>
      </nav>
    </aside>
  );
}