const template = document.createElement('template');
template.innerHTML = `
<style>
* {
    margin: 0;
    padding:0;
    box-sizing: border-box;
}
    .logo {
        padding-left: 50px;
        padding-top: 10px;
    }

    .navbar {
        height: var(--navbar-height);
        width: 100%;
        background: var(--background-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 3;
        box-shadow: 1px 1px 4px #d2d2d2;    
    }

    .navbar__ul {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 100%;
        align-items: center;
        list-style: none;
        position: relative;
    }

    .navbar__lang {
        margin-right: 20px;
    }

    .navbar__li {
        position: relative;
        font-size: 22px;
        font-size: 1.375rem;
        font-family: 'Quattrocento', Arial, Helvetica, sans-serif;
        padding: 20px;
        margin-right: 40px;
    }

    .link:hover {
        color: #ff6b35;   
    }

    .link {
        text-decoration: none;
        color: var(--text-color);
    }

    .toggle-button {
        width: 35px;
        height: 25px;
        position: absolute;
        top: 25px;
        right: 25px;
        display: none;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
    }

    .bar {
        height: 4px;
        width: 100%;
        background: #171614;
        border-radius: 4px;
    }

    .navbar input[type="checkbox"] {
        display: none;
    }

    .nav--active {
        color: #ff6b35;
    }

    .nav__lang {
        color: #fff;
        background-color: #ff6b35;
        font-size: 16px;
        font-size: 1rem;
        text-decoration: none;
    }

    .nav__lang:hover {
    cursor: pointer;
    color: #fff;
    }

    .sub-navbar__icon {
        cursor: pointer;
    }

    .sub-navbar,
    .to-sub-navbar {
      list-style: none;
      position: absolute;
      top: 70px;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      background-color: #fff;
      opacity: 0.98;
      display: none;
      margin-left: 60px;
    }

    .sub-navbar__dropdown,
    .to-sub-navbar__dropdown {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    
    .sub-navbar__dropdown:hover,
    .to-sub-navbar__dropdown:hover {
        color: #ff6b35;
    }

    nav li:hover .sub-navbar,
    nav li:hover .to-sub-navbar {
        display: flex;
    }

    .sub-navbar li a,
    .to-sub-navbar li a {
        justify-content: flex-start;
        font-size: 1.25rem;
    }

    .navbar__button {
        margin-right: 40px;
    }

    .navbar__button a {
        text-decoration: none;
        color: #fff;
        background: #ff6b35;
        padding: 10px 15px;
        font-size: 18px;
        font-size: 1.25rem;
        font-weight: bold;
        border: 1px solid #ff6b35;
    }

    .navbar__button a:hover {
        color: #ff6b35;
        background: #fff;
    }

    .toggle-button span.bar {
        transition: transform 200ms linear, opacity 100ms linear;
    }
    .toggle-button span.bar:nth-child(1) {
        transform: translateY(0) rotate(0deg);
    }
    .toggle-button span.bar:nth-child(2) {
        opacity: 1;
    }
    .toggle-button span.bar:nth-child(3) {
        transform: translateY() rotate(0deg);
    }
    #toggle-button:checked ~ .toggle-button span.bar:nth-child(1) {
        transform: translateY(10.5px) rotate(135deg);
    }
    #toggle-button:checked ~ .toggle-button span.bar:nth-child(2) {
        opacity: 0;
    }
    #toggle-button:checked ~ .toggle-button span.bar:nth-child(3) {
        transform: translateY(-10.5px) rotate(-135deg);
    }

    @media only screen and (min-width:760px) and (max-width:979px){
        header {
            padding: 0;
        }
       
       .logo {
        padding: 0;
        width: 100px;
        margin-left: 20px;
        margin-top: 10px;
       }
    
       .logo:hover {
        border-bottom: none;
        cursor: pointer;
       }
    
        .toggle-button {
            display: flex;
        }
    
        .navbar {
            height: 80px;
        }
    
        .navbar__ul {
            height: min-content;
            width: 100%;
            background: #fff;
            display: none;
            position: absolute;
            top: 80px;
            left: 0;
            padding-left: 40px;
            opacity: 0.98;
        }

        .navbar__lang {
            margin-bottom: 30px;
        }

        .sub-navbar__dropdown,
        .to-sub-navbar__dropdown {
            display: block;
            margin-top: 40px;
        }
    
        .sub-navbar__dropdown:hover .sub-navbar,
        .to-sub-navbar__dropdown:hover .to-sub-navbar {
            display: none;
        }
        
        .sub-navbar__dropdown input[type="checkbox"]:checked ~ .sub-navbar
        .to-sub-navbar__dropdown input[type="checkbox"]:checked ~ .to-sub-navbar {
            display: block;
        }
        
        .sub-navbar,
        .to-sub-navbar {
            position: static;
            width: 100%;
            margin-left: 0;
        }
  
        .navbar__li {
            height: min-content;
            width: 80%;
        }
        
        .navbar__button {
            margin-left: 20px;
            margin-top: 20px;
            margin-bottom: 20px;
        }
     
    
        #toggle-button:checked ~ ul {
            display: block;
        }
    }    
    
    @media only screen and (max-width:759px){
        header {
            padding: 0;
        }
       
       .logo {
        padding: 0;
        width: 100px;
        margin-left: 20px;
        margin-top: 10px;
       }
    
       .logo:hover {
        border-bottom: none;
        cursor: pointer;
       }
    
        .toggle-button {
            display: flex;
        }
    
        .navbar {
            height: 80px;
        }
    
        .navbar__ul {
            height: min-content;
            width: 100%;
            background: #fff;
            display: none;
            position: absolute;
            top: 80px;
            left: 0;
            padding-right: 30px;
            text-align: right;
            opacity: 0.98;
        }
    
        .navbar__li {
            height: min-content;
            width: 100%;
            margin-right: 0;
        }

        .navbar__lang {
            margin-bottom: 30px;
        }

        .sub-navbar__dropdown,
        .to-sub-navbar__dropdown {
            display: block;
            margin-top: 40px;
        }
    
        .sub-navbar__dropdown:hover .sub-navbar,
        .to-sub-navbar__dropdown:hover .to-sub-navbar {
            display: none;
        }

        
        .sub-navbar__dropdown input[type="checkbox"]:checked ~ .sub-navbar,
        .to-sub-navbar__dropdown input[type="checkbox"]:checked ~ .to-sub-navbar {
            display: block;
        }

    
        .sub-navbar,
        .to-sub-navbar {
            position: static;
            width: 100%;
            margin-left: 0;
        }
  
        .navbar__button {
            margin-right: 20px;
            margin-top: 20px;
            margin-bottom: 20px;
        }
    
        #toggle-button:checked ~ ul {
            display: block;
        }
    }
</style>

<header>
<nav class="navbar">
    <a href="/de/" class="logo"><img src="/images/logo.svg" width="150"
            alt="Logo Inloopo"></a>
    <input type="checkbox" id="toggle-button">
    <label for="toggle-button" class="toggle-button">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    </label>
    <ul class="navbar__ul">
       <li class="sub-navbar__dropdown">
        <input type="checkbox" id="sub-navbar__checkbox">
        <label for="sub-navbar__checkbox" class="navbar__li">Produkte</label>
            <ul class="sub-navbar">
                <li class="navbar__li"><a class="link" href="investieren">Signaldienst</a></li>
                <li class="navbar__li"><a class="link" href="wikifolio">Managed Account</a></li>
            </ul>
        </li>
        <li class="to-sub-navbar__dropdown">
        <input type="checkbox" id="to-sub-navbar__checkbox">
        <label for="to-sub-navbar__checkbox" class="navbar__li">Tools</label>
            <ul class="to-sub-navbar">
                <li class="navbar__li"><a class="link" href="boersenampel">Börsenampel</a></li>
                <li class="navbar__li"><a class="link" href="sektorrotation">Sektorrotation</a></li>
            </ul>
        </li>
        <li class="navbar__li"><a class="link" href="blog" class="nav--active">Blog</a></li>
        <li class="navbar__li"><a class="link" href="ueber-mich">Über</a></li>
        <li class="navbar__li"><a class="link" href="kontakt">Kontakt</a></li>
        <li class="navbar__button"><a href="e-book-kommt-bald">Freies E-Book</a></li>
        <li class="navbar__li  navbar__lang"><a class="link" href="/">EN</a></li>
    </ul>
</nav>
</header>
`

class MainNavBar extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('main-navbar', MainNavBar);