'use client';

import { motion } from 'framer-motion';

export default function Systems({ regionalDict, localDict }: { regionalDict: any; localDict: any }) {
    return (
        <section className="py-24 bg-[var(--surface)]">
            <div className="container mx-auto px-6">

                {/* Regional */}
                <div className="mb-24">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-3xl md:text-4xl font-bold mb-12 text-center"
                    >
                        <span className="text-[var(--secondary)]">///</span> {regionalDict.title}
                    </motion.h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {regionalDict.items.map((item: string, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="px-6 py-3 border border-white/10 rounded-full bg-[var(--background)] text-sm hover:border-[var(--secondary)] transition-colors cursor-default"
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Local */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-4xl font-bold mb-4">{localDict.title}</h2>
                        <p className="text-[var(--primary)] text-xl mb-8">{localDict.subtitle}</p>
                        <ul className="space-y-4">
                            {localDict.items.map((item: string, i: number) => (
                                <li key={i} className="flex items-center space-x-3">
                                    <span className="w-2 h-2 bg-[var(--accent)] rounded-full" />
                                    <span className="text-[var(--text-muted)]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="aspect-square rounded-full border border-[var(--primary)]/20 flex items-center justify-center relative"
                    >
                        <div className="absolute inset-0 border border-[var(--secondary)]/20 rounded-full animate-ping opacity-20" />
                        <div className="text-center">
                            <div className="text-6xl font-bold text-white mb-2">200k</div>
                            <div className="text-[var(--text-muted)] uppercase tracking-widest">{localDict.populationCoverage}</div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
