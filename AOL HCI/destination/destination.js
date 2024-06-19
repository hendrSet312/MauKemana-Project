var links = document.querySelectorAll('.image-map a');
var image = document.querySelector('.image-map image');
var stars = document.querySelectorAll('.star .fa');
var menu_li = document.querySelector('.menu-li');
let islandNameElement = document.querySelector('.island-name');

const items = {
    'Sumatera': [{ name: 'Jam Gadang', location: 'West Sumatera'},{name : 'Way Kambas', location:'Lampung'}],
    'Bali & Nusa tenggara': [{ name: 'Nusa Penida Island', location: 'Bali' }],
    'Java': [{ name: 'Gelora Bung Karno', location: 'DKI Jakarta' },{ name: 'Kota Tua', location: 'DKI Jakarta' }],
    'Papua':[{ name: 'Raja ampat', location: 'Papua Barat' }]
};

let selectedIsland = {
    'Sumatera': false,
    'Bali & Nusa tenggara': false,
    'Java':false,
    'Sulawesi': false,
    'Kalimantan':false,
    'Maluku' : false,
    'Papua': false
}

function selectIsland(islandName) {
    for (let island in selectedIsland) {
        if (selectedIsland.hasOwnProperty(island)) {
            selectedIsland[island] = (island === islandName);
        }
    }
}


function addItems(items,island_name) {
    menu_li.innerHTML = '';
    items.forEach(item => {
        const a = document.createElement('a');
        const div = document.createElement('div');
        const nameSpan = document.createElement('span');
        const locationSpan = document.createElement('span');
        div.style.backgroundColor = 'orange';
        div.style.border = '0.5px solid';
        div.style.marginBottom = '10px';
        div.style.marginLeft = '10px';
        a.style.textDecoration = 'none';
        a.style.color = 'white';
        a.href = "#";
        if(island_name != 'Bali & Nusa tenggara'){
            a.addEventListener('click', function(event) {
                event.preventDefault();
                alert('Content is not available yet.');
            });
        }else{
            a.href = './destination-sample/destination-sample.html';
        }

        div.className = 'bar-selection';
        nameSpan.className = 'name-destination';
        locationSpan.className = 'location-destination';

        nameSpan.textContent = item.name;
        locationSpan.textContent = '📍' + item.location;
        div.appendChild(nameSpan);
        div.appendChild(locationSpan);

        a.appendChild(div);

        menu_li.appendChild(a);
    });

    return true;
}


function setStars(numberOfStars) {
    for (var i = 0; i < stars.length; i++) {
        stars[i].classList.remove('checked');
    }
    for (var i = 0; i < numberOfStars; i++) {
        stars[i].classList.add('checked');
    }
}

function editMoney(ammount){
    var moneyTotal = document.querySelector('.money-total');
    moneyTotal.textContent = '💵 Spending : $' + ammount ;
}

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(event) {
        event.preventDefault();
        if (this.getAttribute('xlink:title') === 'Sumatera') {
            image.setAttribute('xlink:href', '../img/destination/selected-sumatera.png');
            islandNameElement.textContent = this.getAttribute('xlink:title');
            editMoney(3000);
            setStars(5);
            if(!selectedIsland['Sumatera']){
                selectIsland('Sumatera');
                addItems(items['Sumatera'],'Sumatera');
            }
        } else if (this.getAttribute('xlink:title') === 'Bali & Nusa tenggara') {
            image.setAttribute('xlink:href', '../img/destination/selected-nsb.png');
            islandNameElement.textContent = this.getAttribute('xlink:title');
            editMoney(3000);
            setStars(4);
            if(!selectedIsland['Bali & Nusa tenggara']){
                selectIsland('Bali & Nusa tenggara');
                addItems(items['Bali & Nusa tenggara'],'Bali & Nusa tenggara');
            }
        }else if (this.getAttribute('xlink:title') === 'Java') {
            image.setAttribute('xlink:href', '../img/destination/selected-jawa.png');
            islandNameElement.textContent = this.getAttribute('xlink:title');
            editMoney(3000);
            setStars(5);
            if(!selectedIsland['Java']){
                selectIsland('Java');
                addItems(items['Java'],'Java');
            }
        }else if (this.getAttribute('xlink:title') === 'Kalimantan') {
            image.setAttribute('xlink:href', '../img/destination/selected-kalimantan.png');
            islandNameElement.textContent = this.getAttribute('xlink:title');
            editMoney(3000);
            setStars(0);
            if(!selectedIsland['Kalimantan']){
                selectIsland('Kalimantan');
                addItems(items['Kalimantan'],'Kalimantan');
            }
        }else if (this.getAttribute('xlink:title') === 'Sulawesi') {
            image.setAttribute('xlink:href', '../img/destination/selected-sulawesi.png');
            islandNameElement.textContent = this.getAttribute('xlink:title');
            editMoney(3000);
            setStars(5);
            if(!selectedIsland['Sulawesi']){
                selectIsland('Sulawesi');
                addItems(items['Sulawesi']);
            }
        }else if (this.getAttribute('xlink:title') === 'Maluku') {
            image.setAttribute('xlink:href', '../img/destination/selected-maluku.png');
            islandNameElement.textContent = this.getAttribute('xlink:title');
            editMoney(3000);
            setStars(0);
            if(!selectedIsland['Maluku']){
                selectIsland('Maluku');
                addItems(items['Maluku'],'Maluku');
            }
        }else if (this.getAttribute('xlink:title') === 'Papua') {
            image.setAttribute('xlink:href', '../img/destination/selected-papua.png');
            islandNameElement.textContent = this.getAttribute('xlink:title');
            editMoney(3000);
            setStars(3);
            if(!selectedIsland['Papua']){
                selectIsland('Papua');
                addItems(items['Papua'],'Papua');
            }
        }
    });
}