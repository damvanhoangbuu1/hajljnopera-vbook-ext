load('libs.js');
load('config.js');

function execute(url, page) {
    page = page || '1';
    url = String.format(BASE_URL + "/tag" + url, page);
    console.log(url)
    // log(url);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        var data = [];
        var elems = doc.select("ul#article_list_content li")
        elems.forEach(function(e) {
            data.push({
                name: e.select("h3").text().trim(),
                link: e.select("h3 a").attr('href'),
                cover: e.select("img").attr("data-src") || "https://static.sangtacvietcdn.xyz/img/bookcover256.jpg",
                description: $.Q(e, '.zxzj > p').text().replace('最近章节', ''),
                host: BASE_URL
            })
        })
        var next = parseInt(page, 10) + 1;
        return Response.success(data, next.toString());
    }
    return null;
}