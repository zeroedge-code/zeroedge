
'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-white/10"
    >
      <div className="section flex items-center justify-between py-3">
        <Link href="#top" className="font-semibold tracking-wide">
          zeroedge<span className="text-accent">.crypto</span>
        </Link>
        <div className="flex gap-6 text-sm text-white/70">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#portfolio" className="hover:text-white">Portfolio</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </motion.nav>
  );
}
