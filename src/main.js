let local = localStorage.getItem('x')
let hashmap = JSON.parse(local) || []
rander(hashmap)
$(`.add`).on('click', function () {
    let url = prompt('请输入网站地址')
    if (url.indexOf("http") === -1) {
        url = "https://" + url
    } else {
        url = url
    }

    let urlx = url.replace("http://", '').replace("https://", '').replace("www.", '').replace(/\/.*/, '').replace(' ', '').trim();
    let obj = {
        text: urlx,
        url: url
    }
    hashmap.push(obj)
    rander(hashmap)
})

//使用hashmap表来渲染整个页面
function rander(hashmap) {
    $(".index-main-ul").find('.main-lists').remove()
    hashmap.forEach((node, index) => {
        let $li = $(`<li class="main-list main-lists">
        <svg class="icon close" aria-hidden="true">
        <use xlink:href="#icon-close"></use>
            </svg>
            <a href="${node.url}">
                <div class="list-logo">${node.text[0].toUpperCase()}</div>
                <span class="list-text">${node.text}</span>
            </a>
                </li>`);
        $(`.add`).before($li);
        $li.on('click', '.close', function () {
            hashmap.splice(index, 1)
            rander(hashmap)
        })
        $li.on('mouseover', function () {
            $li.find(`.close`).css('display', 'block')
        })
        $li.on('mouseout', function () {
            $li.find(`.close`).css('display', 'none')
        })
    })
}
window.onbeforeunload = function () {
    let x = JSON.stringify(hashmap)
    localStorage.setItem("x", x)
}