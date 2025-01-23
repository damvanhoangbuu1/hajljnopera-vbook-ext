function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let content = doc.select(".chapter-content").text();
        content = content
            //.replace(/<a[^>]*>([^<]+)<\/a>/g,'')
            .replace(/\r\n/g,'<br>')
            .replace(/&(nbsp|amp|quot|lt|gt);/g, "")
            .replace(/(<br\s*\/?>){2,}/g, '<br>'); 
        return Response.success(content);
    }
    return null;
}