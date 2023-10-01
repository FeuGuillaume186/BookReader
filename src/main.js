
//--[Gestion des evenements de la nav bar]-----------------
const menuItems = document.querySelectorAll('.nav-menu-item');
let itemSelected = null;


// Fonction pour la navigation
const showPage = (pageID) => {
    // Affiche la derniere page ouverte
    if(localStorage.getItem('lastPageOpened') == null) {
        localStorage.setItem('lastPageOpened', 'home');
        pageID = 'home';
    }
    else {
        localStorage.setItem('lastPageOpened', pageID);
    }

    // sert uniquement pour l'indicateur
    menuItems.forEach((i) => {
        (i.getAttribute('id') == pageID) ? i.classList.add('active') : i.classList.remove('active');
    })

    const pageDOM = document.querySelector(`#${pageID}_page`);
    // -- debug -----------------------------------------
    // console.log(pageDOM);
    pageDOM.style.display = "block"; // affiche la page actuelle
    // // masque tous les autres
    document.querySelectorAll('.page').forEach((item) => {
        if(!item.getAttribute('hidden') && item.getAttribute('id') !== pageDOM.getAttribute('id'))
            item.style.display = "none";
        ;
    });

    // Permanent setiing on pages
    switch (pageID) {
        case 'home':
            document.getElementById('topbar').style.display = "flex"
            break;
    
        case 'explore':
            document.getElementById('topbar').style.display = "flex"
            break;
    
        case 'profile':
            document.getElementById('topbar').style.display = "none"
            break;
        default:
            break;
    }
}

// page to load first
showPage(localStorage.getItem('lastPageOpened'));

menuItems.forEach((item) => {
    item.addEventListener('click', () => {
        itemSelected = item.getAttribute('id');

        // -- debug ------------------------------------------
        // console.log("Tu as selectionné " + itemSelected);

        // Animation
        $('#'+itemSelected).transition('pulse');
        
        switch (itemSelected) {
            case 'home':
                // charge la page home ici
                showPage(itemSelected);
                break;
        
            case 'explore':
                // charge la page explore ici
                showPage(itemSelected);
                break;
        
            case 'profile':
                // charge la page profile ici
                showPage(itemSelected);
                break;

            default:
                // charge la page explore ici
                showPage(itemSelected);
                break;
        }
    })
})


// Dark - Light Mode
const darkmode = document.getElementById('toggle-darkmode')
const lightmode = document.getElementById('toggle-lightmode')
const osmode = document.getElementById('toggle-osmode')
let currentThemeMode = localStorage.getItem('themeMode')

const setThemeMode = () => {
    if(currentThemeMode == 'os') {
        if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Le thème sombre est préféré par l'utilisateur
            currentThemeMode = 'dark'
        } else {
            // Le thème clair est préféré par l'utilisateur
            currentThemeMode = 'light'
        }
        lightmode.classList.remove('violet')
        darkmode.classList.remove('violet')
        if(!osmode.classList.contains('purple'))
        osmode.classList.add('purple')
    }

    if(currentThemeMode == 'dark') {
        lightmode.classList.remove('violet')
        if(!darkmode.classList.contains('violet'))
            darkmode.classList.add('violet')
        if(!document.body.classList.contains('dark'))
            document.body.classList.add('dark')
    }
    else if(currentThemeMode == 'light') {
        darkmode.classList.remove('violet')
        if(!lightmode.classList.contains('violet'))
            lightmode.classList.add('violet')
        document.body.classList.remove('dark')
    }
}

setThemeMode()

darkmode
    .onclick = () => {
        currentThemeMode = 'dark'
        localStorage.setItem('themeMode', currentThemeMode)
        setThemeMode()
        osmode.classList.remove('purple')
    }
;

lightmode
    .onclick = () => {
        currentThemeMode = 'light'
        localStorage.setItem('themeMode', currentThemeMode)
        setThemeMode()
        osmode.classList.remove('purple')
    }
;

osmode
    .onclick = () => {
        currentThemeMode = 'os'
        localStorage.setItem('themeMode', currentThemeMode)
        setThemeMode()
    }
;


// Toggle Search bar
const searchButton = document.getElementById('toggle-search-bar')
const searchInput = document.querySelector('#topbar .tools .tool-search input')
const toolSearch = document.querySelector('.tool-search')
const toolTheme = document.querySelector('.tool-theme')
const toolNotif = document.querySelector('.tool-notif')

const toggleSearch = () => {
    if(!searchButton.classList.contains('active')) {
        searchInput.style.width = '0'
        searchInput.style.marginRight = '0'
        toolSearch.style = `
            padding: 0;
            background: transparent;
        `
        toolTheme.hidden = false
        toolNotif.hidden = false
    }
    else {
        searchInput.style.width = '200px'
        searchInput.style.marginRight = '0.6rem'
        toolSearch.style = `
            padding: 0.5rem 0.5rem 0.5rem 1rem;
            background: var(--navbarBackground);
        `
        if(window.innerWidth <= 495) {
            toolTheme.hidden = true
            toolNotif.hidden = true
        }
        if(window.innerWidth > 495) {
            toolTheme.hidden = false
            toolNotif.hidden = false
        }
    }
}

window.addEventListener('load', toggleSearch)
window.addEventListener('scroll', toggleSearch)
window.addEventListener('resize', toggleSearch)

searchButton.onclick = () => {
    if(!searchButton.classList.contains('active'))
        searchButton.classList.add('active')
    else
        searchButton.classList.remove('active')
    toggleSearch()
}