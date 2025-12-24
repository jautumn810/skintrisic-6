export default function SiteHeader({ section }: { section: string }) {
  return (
    <header className="site-header">
      <div className="brand">
        <div>SKINSTRIC</div>
        <div className="section">[ {section} ]</div>
      </div>
      <div className="enter-code">ENTER CODE</div>
    </header>
  );
}

