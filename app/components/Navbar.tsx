const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-2  bg-white">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-wide text-slate-800">
            C# Compiler
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {["Docs", "Github", "Email", ""].map((item) => (
            <a
              key={item}
              href="#"
              className="px-3 py-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
