
'use client';

import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { Badge } from "../components/Badge";
import { PortfolioCard } from "../components/PortfolioCard";

export default function Page() {
  return (
    <main id="top">
      {/* HERO */}
      <section className="hero-gradient">
        <div className="section py-32 md:py-40">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
          >
            zeroedge crypto
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 text-white/70 max-w-2xl"
          >
            A focused crypto vehicle. High-conviction bets, disciplined risk, radical transparency.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Badge>Long-term</Badge>
            <Badge>Research-driven</Badge>
            <Badge>Risk-managed</Badge>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mt-10">
        <div className="section py-16">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-semibold">About</h2>
            <p className="mt-4 text-white/70 max-w-3xl">
              Zeroedge Crypto is a concentrated strategy. We allocate across a small basket of on-chain opportunities where we believe our edge is durable.
              We publish periodic updates and maintain a simple live dashboard for flagship positions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="mt-4">
        <div className="section py-16">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-semibold">Portfolio</h2>
            <p className="mt-3 text-white/70">Representative holdings and public write-ups.</p>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Reveal><PortfolioCard title="ASTER" subtitle="Live dashboard (Aster) →" href="https://coinmarketcap.com/currencies/aster/" /></Reveal>
            <Reveal delay={0.05}><PortfolioCard title="Methodology" subtitle="Thesis notes & risk framework" href="#" /></Reveal>
            <Reveal delay={0.1}><PortfolioCard title="Contact for full deck" subtitle="Access on request" href="#contact" /></Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mt-4">
        <div className="section py-16">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-semibold">Contact</h2>
            <p className="mt-4 text-white/70">For mandates, LP inquiries or diligence, reach out below.</p>
          </Reveal>
          <div className="mt-6 card p-6">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent/60" placeholder="Name" />
              <input className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent/60" placeholder="Email" type="email" />
              <textarea className="md:col-span-2 bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent/60" rows={5} placeholder="Message"></textarea>
              <button className="justify-self-start rounded-xl bg-accent px-5 py-3 font-medium hover:brightness-110 transition">Send</button>
            </form>
            <p className="text-xs text-white/40 mt-3">Form is static by default. Hook it to your backend or a form provider.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
