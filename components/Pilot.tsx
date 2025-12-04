'use client';

import { motion } from 'framer-motion';
import { convertRUBToUSD } from '@/lib/currency';

export default function Pilot({ pilotDict, economyDict, lang }: { pilotDict: any; economyDict: any; lang?: string }) {
    return (
        <section id="pilot" className="py-24 bg-[var(--surface)]">
            <div className="container mx-auto px-6">

                {/* Timeline */}
                <div className="mb-24">
                    <h2 className="text-4xl font-bold mb-12 text-center">{pilotDict.title}</h2>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--primary)] before:to-transparent">
                        {pilotDict.steps.map((step: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--primary)] bg-[var(--background)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                    <div className="w-3 h-3 bg-[var(--primary)] rounded-full" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded border border-white/5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg">{step.name}</h3>
                                        <span className="text-xs font-mono text-[var(--accent)]">{step.time}</span>
                                    </div>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        {pilotDict.costLabel}: {lang === 'en' && step.cost !== '—' ? convertRUBToUSD(step.cost) : step.cost}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Economy Stats */}
                <div className="glass-panel p-8 md:p-12 border border-[var(--accent)]/20">
                    <h3 className="text-2xl font-bold mb-8 text-center">{economyDict.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
                        {economyDict.stats.map((stat: any, i: number) => (
                            <div key={i}>
                                <div className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-2">
                                    {lang === 'en' ? convertRUBToUSD(stat.value) : stat.value}
                                </div>
                                <div className="text-xs uppercase tracking-wider text-[var(--text-muted)]">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
