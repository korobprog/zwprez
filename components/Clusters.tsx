'use client';

import { motion } from 'framer-motion';

export default function Clusters({ dict }: { dict: any }) {
    return (
        <section id="clusters" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl font-bold mb-16 text-center"
                >
                    {dict.title}
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dict.list.map((cluster: any, index: number) => (
                        <motion.div
                            key={cluster.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="glass-panel p-8 h-full border-t-4 border-t-[var(--primary)]">
                                <div className="text-6xl font-bold text-[var(--surface)] absolute top-4 right-4 opacity-50 select-none">
                                    {cluster.id}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-[var(--primary)]">{cluster.name}</h3>
                                <p className="text-[var(--text-muted)] relative z-10">{cluster.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
