'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Benefits({ dict }: { dict: any }) {
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
    const previewLength = 150;

    const toggleExpanded = (index: number) => {
        setExpanded((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const getPreview = (text: string) => {
        if (text.length <= previewLength) return text;
        return text.substring(0, previewLength).trim() + '...';
    };

    return (
        <section id="benefits" className="py-24 relative">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-16 text-center">{dict.title}</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dict.cards.map((card: any, i: number) => {
                        const isExpanded = expanded[i] || false;
                        const showPreview = card.desc.length > previewLength;
                        const displayText = isExpanded || !showPreview ? card.desc : getPreview(card.desc);

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel p-8 hover:bg-(--surface) transition-colors flex flex-col"
                            >
                                <h3 className="text-xl font-bold mb-4 text-(--accent)">{card.title}</h3>
                                
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={isExpanded ? 'expanded' : 'collapsed'}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-1"
                                    >
                                        <p className="text-(--text-muted) leading-relaxed mb-4">{displayText}</p>
                                    </motion.div>
                                </AnimatePresence>

                                {showPreview && (
                                    <button
                                        onClick={() => toggleExpanded(i)}
                                        className="mt-auto pt-4 text-(--primary) hover:text-(--accent) transition-colors text-sm font-semibold flex items-center gap-2 group"
                                    >
                                        <span>{isExpanded ? dict.collapse : dict.expand}</span>
                                        <motion.svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="group-hover:translate-y-0.5 transition-transform"
                                        >
                                            <path
                                                d="M4 6L8 10L12 6"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </motion.svg>
                                    </button>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
