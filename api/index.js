const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "URL चाहिए" });

    try {
        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
        res.json({
            title: info.videoDetails.title,
            thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
            downloadUrl: format.url
        });
    } catch (e) {
        res.status(500).json({ error: "वीडियो नहीं मिला" });
    }
};
          
