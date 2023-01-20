class NavBar extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        const markup = `
        <header>
            <nav class="navbar">
                <a href="../" class="logo"><img src="/images/logo.svg" width="150"
                        alt="Logo Inloopo"></a>
                <input type="checkbox" id="toggle-button">
                <label for="toggle-button" class="toggle-button">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </label>
                <ul>
                    <li><a href="../investieren">Investieren</a></li>
                    <li><a href="../wikifolio">Wikifolio</a></li>
                    <li><a href="../blog" class="nav--active">Blog</a></li>
                    <li><a href="../ueber-mich">Über</a></li>
                    <li><a href="../kontakt">Kontakt</a></li>
                </ul>
            </nav>
        </header>
        `;
        const styles = `
        .logo {
            padding-left: 50px;
            padding-top: 10px;
        }
        
        .navbar {
            height: var(--navbar-height);
            background: var(--background-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            top: 0;
            width: 100%;
            left: 0;
            z-index: 3;
            box-shadow: 1px 1px 4px #d2d2d2;    
        }
        
        .navbar ul {
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            list-style: none;
        }
        
        .navbar li {
            text-align: center;
            position: relative;
            font-size: 22px;
            font-size: 1.375rem;
            font-family: 'Quattrocento', Arial, Helvetica, sans-serif;
            padding: 20px;
            
        }
        
        .navbar a:hover{
            color: #ff6b35;   
            
        }
        
        .navbar ul a {
            text-decoration: none;
            padding: 20px;
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
            padding: 10px;
            font-size: 16px;
            font-size: 1rem;
        }
        
        .nav__lang:hover {
        cursor: pointer;
        color: #fff;
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
        `;

        const style = document.createElement("style");
        style.textContent = styles;
        this.shadowRoot.innerHTML = markup;
        this.shadowRoot.appendChild(style);
    }
}

customElements.define('il-navbar', NavBar);