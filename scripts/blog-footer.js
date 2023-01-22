const template = document.createElement('template');
template.innerHTML = `
<style>
* {
    margin: 0;
    padding:0;
    box-sizing: border-box;
}

.site-footer{
    background: var(--dark-background-color);
    padding: 90px 0;
    width: 100%;
    float: left;
    margin-top: 90px;
}

.site-footer__link--center{
    color: #fff;
    text-decoration: none;
    padding: 0 10px;
}

.site-footer__link--center:hover{
    color: var(--accent-color);
}

.site-footer__text--center{
    color: #fff;
    margin-bottom: 25px;  
    text-align: center; 
}

.site-footer__text{
    color: #fff;
    margin-bottom: 25px;
    font-size: 14px;
    font-size: 0.875rem;
    line-height: 1.7; 
    padding-left: 25px;
    padding-right: 25px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

.site-footer__text--legal {
    padding-top: 60px;
}

.site-footer__heading{
    color: #fff;
    text-align: center;
    margin-bottom: 5px;
}

@media only screen and (max-width:759px){ 

    .site-footer__text {
        width: 90%;
    }

}

@media only screen and (min-width:760px) and (max-width:979px) {
   
    .site-footer__text {
        width: 90%;
    }

}

</style>

<footer class="site-footer">
        <section>
            <h2 class="site-footer__heading">inloopo</h2>
            <p class="site-footer__text--center">Dein Investment. Deine Freiheit.</p>
            <p class="site-footer__text--center">
                <a class="site-footer__link--center" href="../datenschutz">Datenschutz</a> |
                <a class="site-footer__link--center" href="../nutzungsbedingungen">Nutzungsbedingungen</a> |
                <a class="site-footer__link--center" href="../risikohinweis">Risikohinweis</a> |
                <a class="site-footer__link--center" href="../impressum">Impressum</a>
            </p>
            <p class="site-footer__text--center">Copyright © 2022 KW³ Business Ltd</p>

            <div class="wrapper-content  site-footer__text--legal">
                <p class="site-footer__text">Risiko Offenlegung: Der Handel mit ETFs, Futures oder Aktien birgt ein
                    hohes
                    Risiko und ist nicht für jeden Investor geeignet. Ein Investor kann möglicherweise mehr als das
                    eingezahlte Kapital verlieren. Für den Handel sollte nur Risikokapital verwendet werden, bzw. Teile
                    des
                    Risikokapitals. Risikokapital ist Geld, bei dessen Verlust sich keine Änderung der Finanzsituation
                    ergibt bzw. keinen Einfluss auf das Leben mit sich bringt. Eine in der Vergangenheit erzielte
                    Performance ist keine Garantie für zukünftige Gewinne.</p>
                <p class="site-footer__text">
                    Offenlegung der hypothetischen Performance: Hypothetische Performanceergebnisse haben viele
                    inhärente
                    Einschränkungen, von denen einige im Folgenden beschrieben werden. Die dargestellten Ergebnisse des
                    Kontos können in den Gewinnen und Verlusten stark abweichen. Einer der Einschränkungen der
                    hypothetischen Ergebnisse ist, dass Sie durch bekannte historische Daten entstanden sind. Darüber
                    hinaus
                    beinhaltet der hypothetische Handel kein finanzielles Risiko – kein hypothetischer Track Record kann
                    die
                    finanziellen Risiken des tatsächlichen Handels darstellen. Beispielsweise besteht die Möglichkeit,
                    dass
                    der Handel bei Verlusten ausgesetzt bzw. abgebrochen wird, dies kann die tatsächlichen Ergebnisse
                    stark
                    verändern. Des Weiteren gibt es zahlreiche weitere Faktoren die bei der Umsetzung eines
                    Handelsprogramms
                    nicht vollständig in der hypothetischen Performance berücksichtigt werden können und somit die
                    tatsächlichen Ergebnisse beeinflussen können.</p>
            </div>
        </section>
        </div>
    </footer>
`

class BlogFooter extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('blog-footer', BlogFooter);