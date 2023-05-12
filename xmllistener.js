let xmlContent = '';
var csscodeBuf;
var htmlcodeBuf;
var jscodeBuf;
fetch('xml.xml').then((response) => {
    response.text().then((xml) => {
        xmlContent = xml;

        let parser = new DOMParser();
        let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
        let element = xmlDOM.querySelectorAll('element');

        let id = (window.location.search.replace(/^.*?\=/, ''));

        htmlcodeBuf = element[id].children[5].innerHTML.replace("<![CDATA[", "").replace("]]>", "");
        csscodeBuf = element[id].children[6].innerHTML.replace("<![CDATA[", "").replace("]]>", "");
        jscodeBuf = element[id].children[7].innerHTML.replace("<![CDATA[", "").replace("]]>", "");

        document.getElementById('name').innerText = "Название: " + element[id].children[0].innerHTML;
        document.getElementById('author').innerText = "Автор: " + element[id].children[1].innerHTML;
        document.getElementById('shortDescription').innerText = "Короткое описание: " + element[id].children[2].innerHTML;
        document.getElementById('previewImage').src = "preview_img/" + element[id].children[3].innerHTML;
        document.getElementById('longDescription').innerText = "Полное описание: " + element[id].children[4].innerHTML;
        document.getElementById('htmlcode').innerHTML = window.Prism.highlight(htmlcodeBuf, window.Prism.languages.markup, 'markup');
        document.getElementById('csscode').innerHTML = window.Prism.highlight(csscodeBuf, window.Prism.languages.css, 'css');
        document.getElementById('jscode').innerHTML = window.Prism.highlight(jscodeBuf, window.Prism.languages.javascript, 'javascript');
    });
});

function openPreviewTab() {
    var win = window.open();
    win.document.write(htmlcodeBuf.replace("<head>", "<head> <style>" + csscodeBuf + "</style><script defer>" + jscodeBuf + "</script>"));
}