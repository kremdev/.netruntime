import Navbar from "./components/Navbar";
import CodeWindow from "./components/CodeWindow";
import {} from "./lib/runCode";

const Page = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-[1.5] text-sm font-medium">
        SharpLab v2.0 is here — now with .NET 8 support and improved
        IntelliSense
      </div>

      <Navbar />

      <section className="flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none mb-6 text-slate-900">
          The open source
          <br />
          C# compiler
        </h1>

        <p className="max-w-lg text-base sm:text-lg text-slate-600 leading-relaxed mb-10">
          Write, compile, and execute C# code directly in your browser. No
          setup, no installations — just open and start coding.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-16">
          <a
            href="/editor"
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-md
                       bg-gradient-to-r from-blue-400 to-blue-500
                       hover:from-blue-500 hover:to-blue-600
                       text-white text-sm font-semibold
                       transition-all duration-300 shadow-md"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            Start Coding
          </a>
          <a
            title="Soon"
            href="#"
            className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-md
             bg-white border border-blue-500
             text-slate-90 text-sm font-semibold
             hover:bg-blue-50 hover:border-blue-300
             transition-all duration-300
             shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              <path d="M12 3v12" />
              <path d="M7 10l5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Download for Windows
          </a>
        </div>

        <p className="text-sm text-slate-500 mb-12">
          <a
            href="#"
            className="underline underline-offset-2 hover:text-slate-900 transition-colors"
          >
            Web
          </a>
          ,{" "}
          <a
            href="#"
            className="underline underline-offset-2 hover:text-slate-900 transition-colors"
          >
            Desktop
          </a>
          , or{" "}
          <a
            href="#"
            className="underline underline-offset-2 hover:text-slate-900 transition-colors"
          >
            other platforms
          </a>
        </p>

        <CodeWindow />
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 bg-white">
        <span>SharpLab · C# Compiler</span>
        <span>Built with .NET & WebAssembly</span>
      </footer>
    </div>
  );
};

export default Page;
