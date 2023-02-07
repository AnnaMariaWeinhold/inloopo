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
                <p class="site-footer__text--center">Your Investment. Your Freedom.</p>
                <p class="site-footer__text--center">
                    <a class="site-footer__link--center" href="privacy-policy">Privacy Policy</a> |
                    <a class="site-footer__link--center" href="terms-and-conditions">Terms and Conditions</a> |
                    <a class="site-footer__link--center" href="risk-disclosure">Risk Disclosure</a> |
                    <a class="site-footer__link--center" href="risk-disclaimer">Risk Disclaimer</a> |
                    <a class="site-footer__link--center" href="impressum">Impressum</a>
                </p>
                <p class="site-footer__text--center">Copyright © 2022 KW³ Business Ltd</p>

                <div class="wrapper-content  site-footer__text--legal">
                    <p class="site-footer__text">Risk disclosure: ETF, stocks, futures, foreign currency and options
                        trading
                        contains substantial risk and is not for every investor. An investor could potentially lose all
                        or
                        more than the initial investment. Risk capital is money that can be lost without jeopardizing
                        one's
                        financial security or lifestyle. Only risk capital should be used for trading and only those
                        with
                        sufficient risk capital should consider trading. Past performance is not necessarily indicative
                        of
                        future results.</p>
                    <p class="site-footer__text">
                        Disclosure of hypothetical performance: CFTC Rules 4.41 - Hypothetical or Simulated performance
                        results have certain limitations, unlike an actual performance record, simulated results do not
                        represent actual trading. Also, since the trades have not been executed, the results may have
                        under-or-over compensated for the impact, if any, of certain market factors, such as lack of
                        liquidity. Simulated trading programs in general are also subject to the fact that they are
                        designed
                        with the benefit of hindsight. No representation is being made that any account will or is
                        likely to
                        achieve profit or losses similar to those shown.</p>
                </div>
            </section>
    </div>
    </footer>
`

class SiteFooter extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('site-footer-en', SiteFooter);