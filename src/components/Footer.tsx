
export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="section py-8 text-sm text-white/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} zeroedge crypto. All rights reserved.</p>
        <div className="flex gap-4">
          <a className="hover:text-white" href="mailto:contact@zeroedgecrypto.com">contact@zeroedgecrypto.com</a>
          <a className="hover:text-white" href="https://x.com" target="_blank">X</a>
          <a className="hover:text-white" href="https://linkedin.com" target="_blank">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
