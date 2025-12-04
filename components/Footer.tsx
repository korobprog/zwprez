'use client';

export default function Footer({ dict }: { dict: any }) {
    return (
        <footer id="contact" className="py-24 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-10" />
            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 font-heading">{dict.title}</h2>
                
                {dict.organization && (
                    <p className="text-xl text-(--text-muted) mb-8">{dict.organization}</p>
                )}

                {/* CTA Section */}
                {dict.cta && (
                    <div className="mb-12">
                        <h3 className="text-3xl md:text-5xl font-bold mb-6 text-(--primary)">{dict.cta.title}</h3>
                        {dict.cta.messages && (
                            <div className="space-y-3 mb-6">
                                {dict.cta.messages.map((message: string, i: number) => (
                                    <p key={i} className="text-lg md:text-xl text-white">{message}</p>
                                ))}
                            </div>
                        )}
                        {dict.cta.offer && (
                            <p className="text-xl md:text-2xl text-(--accent) mb-4 font-semibold">{dict.cta.offer}</p>
                        )}
                        {dict.cta.welcome && (
                            <p className="text-2xl md:text-3xl font-bold text-(--primary)">{dict.cta.welcome}</p>
                        )}
                    </div>
                )}

                <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
                    {dict.email && (
                        <>
                            <a href={`mailto:${dict.email}`} className="text-xl hover:text-(--primary) transition-colors">
                                {dict.email}
                            </a>
                            {dict.phone && <span className="hidden md:block text-(--text-muted)">•</span>}
                        </>
                    )}
                    {dict.phone && (
                        <>
                            <a href={`tel:${dict.phone}`} className="text-xl hover:text-(--primary) transition-colors">
                                {dict.phone}
                            </a>
                            {dict.messengers && <span className="hidden md:block text-(--text-muted)">•</span>}
                        </>
                    )}
                    {dict.messengers && (
                        <span className="text-lg text-(--text-muted)">{dict.messengers}</span>
                    )}
                </div>

                <div className="text-(--text-muted) text-sm">
                    © {new Date().getFullYear()} ZW&US Civilization Holding. {dict.copyright}
                </div>
            </div>
        </footer>
    );
}
