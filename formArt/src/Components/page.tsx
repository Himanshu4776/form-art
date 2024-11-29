import { Paintbrush, ArrowRight } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="doodle-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10 Q 30 30, 50 10 T 90 10" fill="none" stroke="#e0e7ff" strokeWidth="2"/>
              <circle cx="50" cy="50" r="5" fill="#818cf8"/>
              <path d="M80 80 L 90 70 L 80 60" fill="none" stroke="#c7d2fe" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doodle-pattern)"/>
        </svg>
      </div>
      <header className="relative px-4 lg:px-6 h-14 flex items-center bg-white/80 backdrop-blur-md z-10">
        <a href="/" className="flex items-center justify-center">
          <Paintbrush className="h-6 w-6 mr-2 text-indigo-600" />
          <span className="font-bold text-indigo-600">FormArt Draw</span>
        </a>
      </header>
      <main className="relative flex-1 flex items-center justify-center z-10">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-indigo-600">
                  Welcome to FormArt Draw
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Unleash your creativity with our intuitive drawing app. Create, share, and explore art like never before.
                </p>
              </div>
              <div className="space-x-4">
                <a 
                  href="/draw" 
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Start Drawing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="relative flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 bg-white/80 backdrop-blur-md z-10">
        <p className="text-xs text-gray-600">© 2023 FormArt Draw. All rights reserved.</p>
      </footer>
    </div>
  );
}

