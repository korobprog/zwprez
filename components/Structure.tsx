'use client';

import { motion } from 'framer-motion';

export default function Structure({ dict }: { dict: any }) {
    return (
        <section id="structure" className="py-24 bg-[var(--surface)] relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">{dict.title}</h2>
                    <p className="text-[var(--text-muted)] max-w-2xl mx-auto">{dict.description}</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dict.roles.map((role: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel p-6 hover:border-[var(--primary)] transition-colors group"
                        >
                            <div className="h-12 w-12 rounded-full bg-[var(--surface)] border border-[var(--primary)] flex items-center justify-center mb-4 group-hover:bg-[var(--primary)] transition-colors">
                                <span className="text-[var(--primary)] font-bold group-hover:text-black">{index + 1}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">{role.title}</h3>
                            <p className="text-sm text-[var(--text-muted)]">{role.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
