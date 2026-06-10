module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { url } = req.query;

    if (!url) return res.status(400).json({ error: "कृपया वीडियो लिंक दें" });

    try {
        // RapidAPI को कॉल करें
        const response = await fetch(`https://youtube-video-downloader-4k-and-8k-mp3.p.rapidapi.com/startDownload.php?url=${encodeURIComponent(url)}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'youtube-video-downloader-4k-and-8k-mp3.p.rapidapi.com',
                'x-rapidapi-key': 'ed970df315msh32071ac3ef82f73p14ce9cjsnd8ece1747e23'
            }
        });

        const data = await response.json();

        // यहाँ डेटा चेक करें (यह API किस फॉर्मेट में डेटा दे रही है)
        // मान लेते हैं कि API 'url' या 'download_link' के नाम से डेटा दे रही है
        return res.status(200).json({
            title: data.title || "वीडियो",
            thumbnail: data.thumbnail || "",
            downloadUrl: data.url || data.link || "" 
        });
    } catch (e) {
        return res.status(500).json({ error: "सर्वर एरर: " + e.message });
    }
};
