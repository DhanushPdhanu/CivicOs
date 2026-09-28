import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary-600 flex items-center justify-center text-white text-xs font-bold">C</div>
            <span className="font-semibold text-foreground">CivicOS</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
            <Link href="/help" className="hover:text-foreground transition-colors">Help</Link>
          </div>
          <p className="text-xs text-muted-foreground text-center md:text-right">
            Hackathon Prototype &mdash; All data is synthetic demo data
          </p>
        </div>
      </div>
    </footer>
  );
}
