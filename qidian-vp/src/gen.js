load('libs.js');
load('gbk.js');
function execute(url, page) {
    try {
        if (!page) page = '1';
        let inputUrl = url + '?page=' + page;
        let response = fetch(inputUrl);
        if (response.ok) {
            let doc = response.html();
            var data = [];
            var elems = $.QA(doc, 'a.items-center');
            if (!elems.length) return Response.error(url);
            elems.forEach(function (e) {
                data.push({
                    name: e.select("h3.font-bold").text(),
                    link: e.attr('href'),
                    cover: e.select("img").attr('src'),
                    description: e.select("div.mb-auto").text(),
                    author: "",
                    kind: ""
                })
            })
            let next_page = parseInt(page) + 1;
            return Response.success(data, next_page.toString());
        }
        return null;
    } catch (error) {
        return Response.success([{
            name: "BUU",
            link: "BUU",
            cover: "https://cdn.qidian-vp.com/poster/cau-tha-thanh-thanh-nhan-tien-quan-trieu-ta-cham-ngua-150.jpg",
            description: error.message,
            author: "",
            kind: ""
        }], 0);
    }

}