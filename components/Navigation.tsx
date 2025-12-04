'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export default function Navigation({ dict, lang }: { dict: any; lang?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const langDropdownRef = useRef<HTMLDivElement>(null);
    
    // Значение по умолчанию для lang
    const currentLang = lang || 'ru';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Закрытие dropdown при клике вне его
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
                setIsLangDropdownOpen(false);
            }
        };

        if (isLangDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isLangDropdownOpen]);

    const navLinks = [
        { name: dict.home, href: '#hero' },
        { name: dict.about, href: '#about' },
        { name: dict.structure, href: '#structure' },
        { name: dict.clusters, href: '#clusters' },
        { name: dict.contact, href: '#contact' },
    ];

    const languages = [
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'zh', name: '中文', flag: '🇨🇳' },
        { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    ];

    const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

    const switchLanguage = (langCode: string) => {
        if (langCode === currentLang) {
            setIsLangDropdownOpen(false);
            return;
        }
        
        // Извлекаем путь без языка
        const pathWithoutLang = pathname.replace(/^\/(ru|en|es|zh|hi)/, '') || '/';
        
        // Сохраняем текущий хеш (якорь), если есть
        const hash = typeof window !== 'undefined' ? window.location.hash : '';
        
        // Формируем новый путь
        const newPath = `/${langCode}${pathWithoutLang === '/' ? '' : pathWithoutLang}${hash}`;
        
        // Используем router для навигации
        router.push(newPath);
        setIsLangDropdownOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
                scrolled ? 'glass-panel py-4' : 'bg-transparent py-6'
            )}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href={`/${currentLang}`} className="text-2xl font-bold tracking-tighter font-heading text-white">
                    ZW<span className="text-(--primary)">&</span>US
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm uppercase tracking-widest hover:text-(--primary) transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-(--primary) transition-all group-hover:w-full" />
                        </Link>
                    ))}

                    {/* Language Dropdown */}
                    <div className="relative" ref={langDropdownRef}>
                        <button
                            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                            className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-(--primary) text-(--primary) hover:bg-(--primary) hover:text-black transition-all group"
                        >
                            <Globe size={14} className="group-hover:rotate-12 transition-transform" />
                            <span className="text-xs font-bold">{currentLanguage.code.toUpperCase()}</span>
                            <ChevronDown 
                                size={12} 
                                className={clsx(
                                    "transition-transform duration-200",
                                    isLangDropdownOpen && "rotate-180"
                                )}
                            />
                        </button>

                        <AnimatePresence>
                            {isLangDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full right-0 mt-2 w-48 glass-panel rounded-lg border border-white/10 overflow-hidden shadow-xl z-50"
                                >
                                    <div className="py-2">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => switchLanguage(lang.code)}
                                                className={clsx(
                                                    "w-full px-4 py-3 flex items-center space-x-3 text-left transition-all",
                                                    lang.code === currentLang
                                                        ? "bg-(--primary)/20 text-(--primary) border-l-2 border-(--primary)"
                                                        : "text-white hover:bg-white/5 hover:text-(--primary)"
                                                )}
                                            >
                                                <span className="text-lg">{lang.flag}</span>
                                                <span className="text-sm font-medium">{lang.name}</span>
                                                {lang.code === currentLang && (
                                                    <span className="ml-auto text-(--primary)">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden glass-panel border-t border-white/10"
                >
                    <div className="flex flex-col p-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium hover:text-(--primary)"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="space-y-2">
                            <div className="text-sm text-(--text-muted) mb-2">{dict.switchTo}:</div>
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        switchLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={clsx(
                                        "w-full text-left px-4 py-2 rounded-lg transition-all flex items-center space-x-3",
                                        lang.code === currentLang
                                            ? "bg-(--primary)/20 text-(--primary) border border-(--primary)"
                                            : "text-white hover:bg-white/5 hover:text-(--primary)"
                                    )}
                                >
                                    <span className="text-lg">{lang.flag}</span>
                                    <span className="font-medium">{lang.name}</span>
                                    {lang.code === currentLang && (
                                        <span className="ml-auto text-(--primary)">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
