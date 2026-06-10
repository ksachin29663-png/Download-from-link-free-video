const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
    // CORS ताकि किसी भी डोमेन से एक्सेस हो सके
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "URL नहीं मिला" });

    try {
        // validateURL चेक करता है कि लिंक सही है या नहीं
        if (!ytdl.validateURL(url)) {
            return res.status(400).json({ error: "अवैध YouTube लिंक" });
        }

        const info = await ytdl.getInfo(url);
        
        // सबसे अच्छी क्वालिटी वाला फॉर्मेट चुनें
        const format = ytdl.chooseFormat(info.formats, { 
            quality: 'highest',
            filter: 'videoandaudio' // वीडियो और ऑडियो दोनों साथ में
        });
        
        return res.status(200).json({
            title: info.videoDetails.title,
            thumbnail: info.videoDetails.thumbnails.pop().url,
            downloadUrl: format.url
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "वीडियो प्रोसेस नहीं हो पाया: " + e.message });
    }
};
