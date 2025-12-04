'use client';

import { motion } from 'framer-motion';

export default function About({ dict }: { dict: any }) {
    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            <span className="text-[var(--primary)]">02.</span> {dict.title}
                        </h2>
                        <div className="space-y-6 text-[var(--text-muted)] text-lg leading-relaxed">
                            <p>{dict.description}</p>
                            <p className="text-white border-l-2 border-[var(--accent)] pl-6">
                                {dict.chain}
                            </p>
                            <p>{dict.conclusion}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Decorative Elements */}
                        <div className="absolute -inset-4 bg-[var(--secondary)] opacity-20 blur-2xl rounded-full" />

                        <div className="glass-panel p-8 md:p-12 relative z-10 border border-[var(--primary)]/30">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-[var(--surface)] border border-white/5">
                                    <div className="text-3xl font-bold text-[var(--primary)] mb-2">19</div>
                                    <div className="text-xs uppercase tracking-wider text-[var(--text-muted)]">{dict.sections}</div>
                                </div>
                                <div className="p-4 bg-[var(--surface)] border border-white/5">
                                    <div className="text-3xl font-bold text-[var(--accent)] mb-2">100%</div>
                                    <div className="text-xs uppercase tracking-wider text-[var(--text-muted)]">{dict.zeroWaste}</div>
                                </div>
                                <div className="p-4 bg-[var(--surface)] border border-white/5 col-span-2">
                                    <div className="text-xl font-bold text-white mb-2">{dict.globalManagement}</div>
                                    <div className="text-xs uppercase tracking-wider text-[var(--text-muted)]">{dict.strategicOperational}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
