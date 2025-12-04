'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Globe3D = dynamic(() => import('./Globe3D'), { ssr: false });

export default function Hero({ dict }: { dict: any }) {
    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-(--background) z-0">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-(--background) z-10" />

                {/* 3D Globe/Grid */}
                <div 
                    className="absolute inset-0 opacity-20 bg-center bg-[url('/images/grid-pattern.png')]"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-100 z-2">
                    <Globe3D />
                </div>
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-(--background) z-3" />
            </div>

            <div className="container mx-auto px-6 relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-(--primary) tracking-[0.2em] text-sm md:text-base mb-4 uppercase font-bold">
                        {dict.subtitle}
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold font-heading mb-6 leading-tight">
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-white to-(--text-muted) text-3d inline-block">
                            ZW
                        </span>
                        <span className="text-(--primary) text-3d-primary inline-block">&</span>
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-white to-(--text-muted) text-3d inline-block">
                            US
                        </span>
                        <br />
                        <span className="text-3xl md:text-6xl text-(--text-muted)">CIVILIZATION</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-(--text-muted) mb-10 leading-relaxed">
                        {dict.description}
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link 
                            href="#about"
                            className="px-8 py-4 bg-(--primary) text-black font-bold rounded-none hover:bg-white transition-all clip-path-slant inline-block text-center"
                        >
                            {dict.cta}
                        </Link>
                        <div className="text-(--accent) text-sm tracking-widest border border-(--accent) px-6 py-3 rounded-none">
                            {dict.principle}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-(--text-muted)"
            >
                <div className="w-px h-16 bg-linear-to-b from-transparent via-(--primary) to-transparent" />
            </motion.div>
        </section>
    );
}
