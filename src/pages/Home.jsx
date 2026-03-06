import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import PYQ from '../components/PYQ';
import YoutubeVideos from '../components/YoutubeVideos';

export default function Home() {
    const location = useLocation();

    useEffect(() => {
        const navEntries = window.performance.getEntriesByType("navigation");
        const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

        if (isReload) {
            window.history.replaceState(null, '', '/');
            window.scrollTo({ top: 0, behavior: 'instant' });
            return;
        }

        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);
    return (
        <div>
            <Hero />
            <Features />
            <PYQ />
            <YoutubeVideos />
        </div>
    );
}
