export function getYouTubeEmbedUrl(url) {
    if (!url) return null;

    try {
        const parsed = new URL(url);
        let videoId = '';

        if (parsed.hostname.includes('youtu.be')) {
            videoId = parsed.pathname.slice(1);
        } else if (parsed.hostname.includes('youtube.com')) {
            if (parsed.pathname === '/watch') {
                videoId = parsed.searchParams.get('v') || '';
            } else if (parsed.pathname.startsWith('/embed/')) {
                videoId = parsed.pathname.split('/')[2] || '';
            } else if (parsed.pathname.startsWith('/shorts/')) {
                videoId = parsed.pathname.split('/')[2] || '';
            }
        }

        if (!videoId) return null;

        return `https://www.youtube.com/embed/${videoId}`;
    } catch {
        return null;
    }
}
