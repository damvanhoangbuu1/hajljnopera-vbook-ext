load('libs.js');
load('config.js');
load('common.js');

function execute(key, page) {
    let arrKey = key.split("&");
    if (!page) page = '1';
    let sort = 'update';
    if (arrKey.length == 2) {
        sort = arrKey[1];
    }

    let url = `${STVHOST}/io/searchtp/searchBooks/?findinname=${encodeURIComponent(arrKey[0])}&sort=${sort}&host=69shu&minc=0&tag=&p=${page}`;
    if (key.startsWith("find=")) {
        url = `${STVHOST}/io/searchtp/searchBooks/?find=${encodeURIComponent(arrKey[0].replace("find=", ""))}&sort=${sort}&host=69shu&minc=0&tag=&p=${page}`;
    }
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html()
        let next = parseInt(page, 10) + 1;
        let el = doc.select("a.booksearch")
        let data = [];
        el.forEach(e => {
            let stv_story_link = e.select("a").first().attr("href");
            let bookid = stv_story_link.split("/")[4];
            data.push({
                name: toCapitalize(e.select(".searchbooktitle").first().text()),
                link: `${BASE_URL}/book/${bookid}.htm`,
                cover: `https://static.69shuba.com/files/article/image/${bookid.slice(0, bookid.length - 3)}/${bookid}/${bookid}s.jpg`,
                description: e.select(" div > span.searchtag").last().text(),
                host: ""
            })
        });

        return Response.success(data, next.toString());
    }

    return Response.error(`fetch ${url} failed: status ${response.status}`);
}