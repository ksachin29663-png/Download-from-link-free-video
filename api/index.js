const { execSync } = require('child_process');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { url } = req.query;

    if (!url) return res.status(400).json({ error: "URL दें" });

    try {
        // हम yt-dlp का उपयोग करके सीधे वीडियो की जानकारी मांग रहे हैं
        const command = `yt-dlp -j "${url}"`;
        const output = execSync(command).toString();
        const info = JSON.parse(output);

        res.status(200).json({
            title: info.title,
            thumbnail: info.thumbnail,
            // yt-dlp सबसे बेस्ट क्वालिटी का लिंक खुद चुन लेता है
            downloadUrl: info.url 
        });
    } catch (e) {
        res.status(500).json({ error: "YouTube ने एक्सेस ब्लॉक किया है। कृपया 10 मिनट बाद कोशिश करें।" });
    }
};
