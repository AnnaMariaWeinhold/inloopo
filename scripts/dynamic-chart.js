class DynamicChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const markup = `
    <section id="interactive-chart-section">
    <h2 class="chart__heading">Meine ETF Strategie schlägt den Markt</h2>
    <div id="chart-controls">
      <form>
        <label class="chart__p" for="start-money">Startkapital</label>
        <input id="start-money" class="chart__input" type="number" value="10000">
        <label class="chart__p" style="position: relative" for="start-year">Startjahr
            <input id="start-year" class="chart__input" type="number" min="1998" max="2021" value="1998">
            <ul id="year-picker">
                ${[...Array(24).keys()].map((n) => `<li data-value=${n + 1998}>${n + 1998}</li>`).join("")}
            </ul>
        </label>
      </form>
    </div>

    <div class="drawdowns">
        <p>Max. Drawdown</p>
        <div id="strategy-drawdown-element"></div>
        <div id="sp-drawdown-element"></div>
    </div>
    <div id="interactive-chart" style="width: 100%; height: 600px"></div>
  </section>
    `;
    const styles = `
    * {
      box-sizing: border-box;
    }
    @media screen and (max-width: 600px) {
      #interactive-chart-section {
        margin-left: 12px;
        margin-right: 12px;
      }
    }
    #interactive-chart-section {
      margin-top: 40px;
      margin-bottom: 40px;
    }
    
    .chart__heading {
      text-align: center;
      padding: 40px 25px 15px 25px;
      font-size: 28px;
    }
    
    .chart__p {
      text-transform: uppercase;
      font-weight: bold;
      margin-right: 10px;
    }
    
    .chart__input {
      padding: 6px 16px;
      margin: 0 20px 0 10px;
      font-size: 18px;
    }
    
    .chart__input:focus {
      outline: 1px solid #ff6b35;
      outline-offset: 2px;
    }
    
    #chart-controls {
      display: flex;
      justify-content: center;
      margin-bottom: 12px;
    }
    
    @media screen and (max-width: 768px) {
      #chart-controls form input {
        width: 100%;
        margin: 6px 0 12px 0;
      }
    }
    
    @media screen and (max-width: 480px) {
      #interactive-chart-section .drawdowns {
        display: block;
      }
      .drawdowns #strategy-drawdown-element,
      .drawdowns #sp-drawdown-element {
        display: inline-block;
        width: 45%;
      }
    }
    
    label[for="start-year"] {
      position: relative;
    }
    
    #year-picker {
      display: none;
    }
    
    input#start-year:focus + #year-picker,
    #year-picker:hover {
      position: absolute;
      z-index: 1;
      top: 24px;
      left: 64px;
      display: grid;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: 2px 0px 6px rgba(0,0,0,0.33);
      list-style: none;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: auto;
      padding-inline: 0;
    }
    
    #year-picker li {
      padding: 4px 12px;
    }
    #year-picker li:hover {
      cursor: pointer;
      color: #ff6b35;
    }
    
    #year-picker li + li {
      border-top: 1px solid lightgray;
    }
    
    .drawdowns {
      display: flex;
      gap: 30px;
      font-size: 21px;
      font-weight: bold;
      justify-content: center;
      margin-bottom: 12px;
    }

    .drawdowns p {
      margin: 0;
    }
    
    #strategy-drawdown-element {
      color: #ff6b35;
    }
    #sp-drawdown-element {
      color: #253C78;
    }
    `;

    window.dcIndices = {};
    const observer = new IntersectionObserver((entries, observerRef) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const style = document.createElement("style");
          style.textContent = styles;
          this.shadowRoot.innerHTML = markup;
          this.shadowRoot.appendChild(style);
          observerRef.unobserve(entry.target);
          try {
            import(`./dynamic-chart-core.js`);

            for (let i = 0; i < this.attributes.length; i++) {
              const indexName = this.attributes[i].name;
              fetch(`/data/${indexName}.json`)
                .then((data) => data.json())
                .then((jsonData) => {
                  window.dcIndices[indexName] = jsonData;
                });
            }
          } catch (e) {
            console.error(e);
          }
        }
      });
    });
    observer.observe(this);
  }
}

customElements.define("dynamic-chart", DynamicChart);