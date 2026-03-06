import React from 'react';
import { FiPlay } from 'react-icons/fi';

// Helper function to extract YouTube ID and return thumbnail URL
const getYoutubeThumbnail = (link, fallbackImage) => {
    if (!link || link === '#') return fallbackImage;

    try {
        // Regex to extract video ID from various YouTube URL formats (including shorts)
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = link.match(regExp);

        if (match && match[2].length === 11) {
            const videoId = match[2];
            // Returns the high-resolution thumbnail
            return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
    } catch (err) {
        console.error("Error parsing YouTube Link", err);
    }
    return fallbackImage;
};

const VideoCard = ({ video }) => {
    const [imgSrc, setImgSrc] = React.useState(() => getYoutubeThumbnail(video.link, video.image));

    // If the video link changes, update the thumbnail
    React.useEffect(() => {
        setImgSrc(getYoutubeThumbnail(video.link, video.image));
    }, [video.link, video.image]);

    return (
        <a href={video.link} target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group flex flex-col cursor-pointer">
            <div className="relative overflow-hidden aspect-video relative bg-gray-200 dark:bg-gray-800">
                <img
                    src={imgSrc}
                    onError={() => {
                        // Fallback to maxresdefault might fail for some videos, try hqdefault
                        if (imgSrc.includes('maxresdefault.jpg')) {
                            setImgSrc(imgSrc.replace('maxresdefault.jpg', 'hqdefault.jpg'));
                        } else if (imgSrc.includes('hqdefault.jpg')) {
                            setImgSrc(video.image); // Final fallback to default image
                        }
                    }}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* YouTube Play Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                    <div className="w-16 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <FiPlay className="text-white fill-current w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col justify-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:hover:text-purple-400 transition-colors leading-snug">
                    {video.title}
                </h3>
            </div>
        </a>
    );
};

export default function TrendingVideos() {

    const videos = [
        {
            id: 1,
            title: "I Built a Sleep Detector That Can Save Thousands of Lives!",
            duration: "45:20",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            link: "https://youtu.be/84gEUlGYFfQ?si=KaAHv0URPHIMgfLG" // Example working YT link
        },
        {
            id: 2,
            title: "Why People Are Still Struggling? | GNIOT Industrial Visit ",
            duration: "28:15",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            link: "https://youtu.be/5mmqOYRDKPQ?si=IyHR9FYGrdRhVzyq"
        },
        {
            id: 3,
            title: "It's my personal experience don't take it seriously......baki aap kud samajdar ho",
            duration: "1:15:45",
            image: "https://images.unsplash.com/photo-1526040652367-bc00b28cecd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            link: "https://youtu.be/S06xJO5R-_c?si=Wjq3EBqbxrTBLKq4"
        },
        {
            id: 4,
            title: "BUILD Websites in Minutes with Replit Agent (No Coding)",
            duration: "56:10",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            link: "https://youtu.be/v2g2FERfe18?si=B7zhYhCp6qCKTH2k"
        },
        {
            id: 5,
            title: "Btech first year experience",
            duration: "3:45:20",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            link: "https://youtu.be/o26bWrmE8uo?si=_Eq9NYDLk0xWeLMC"
        },
        {
            id: 6,
            title: "Mastering Tailwind CSS in 50 Minutes",
            duration: "52:15",
            image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            link: "https://youtu.be/t7dYtWHJqq4?si=Qo_kG0UmtsTh6bRW"
        },
        {
            id: 7,
            title: "Vlog",
            duration: "1:20:10",
            image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            link: "https://youtu.be/2tqiNE71oEU?si=Xi7RV1BZMgKTC2Jo"
        },
        {
            id: 8,
            title: "Introduction to Generative AI",
            duration: "40:05",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
    ];

    return (
        <section id="videos" className="pt-12 pb-24 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Trending YouTube Videos</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Enhance your learning with our curated collection of free YouTube tutorials.</p>
                    </div>
                    <button className="mt-6 md:mt-0 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 transition-colors flex items-center group">
                        Explore All Videos
                        <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {videos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </section>
    );
}
