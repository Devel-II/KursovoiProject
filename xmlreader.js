let xmlContent = '';
let putElementsHere = document.getElementById('putElementsHere');

fetch('xml.xml').then((response) => {
    response.text().then((xml) => {
        xmlContent = xml;
        let parser = new DOMParser();
        let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
        let cells = xmlDOM.querySelectorAll('element');
        let i = 0;
        cells.forEach(xmlElement => {
            let div = document.createElement('a');
            div.href = "view.html?id=" + i; 
            i++;

            let element = document.createElement('h2');
            element.innerText = xmlElement.children[0].innerHTML;
            div.appendChild(element);

            element = document.createElement('h4');
            element.innerText = "Автор: " + xmlElement.children[1].innerHTML;
            div.appendChild(element);

            element = document.createElement('img');
            element.className = "preview";
            element.src = "preview_img/" + xmlElement.children[3].innerHTML;
            div.appendChild(element);

            element = document.createElement('p');
            element.innerText = xmlElement.children[2].innerHTML;
            div.appendChild(element);

            putElementsHere.appendChild(div);
        });
    });
});