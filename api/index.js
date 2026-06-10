const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
    // CORS हेडर जोड़ने से 'सर्वर एरर' की आधी समस्या खत्म हो जाती है
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "URL नहीं मिला" });

    try {
        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
        
        return res.status(200).json({
            title: info.videoDetails.title,
            thumbnail: info.videoDetails.thumbnails.pop().url,
            downloadUrl: format.url
        });
    } catch (e) {
        return res.status(500).json({ error: "प्रोसेसिंग विफल: " + e.message });
    }
};
