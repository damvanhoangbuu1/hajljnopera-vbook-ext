function execute(url, page) {
	url = url.replace('m.biquge345.com', 'www.biquge345.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];

        doc.select(".right_border").forEach(rightBorder => {
            rightBorder.select("li").forEach(e => {
                url = e.select("h3.p2 a").first().attr("href") ?? e.select("span.name a").first().attr("href");
                if(url.startsWith("/")) url = "https://www.biquge345.com" + url;
                data.push({
                    name: e.select("h3.p2 a").first().text() ?? e.select("span.name a").first().text(),
                    link: url,
                    description: url + "<br>" + e.select("p.p3").text() ?? '',
                    host: ""
                })
            });
        });

        return Response.success(data)
    }
    return null;
}