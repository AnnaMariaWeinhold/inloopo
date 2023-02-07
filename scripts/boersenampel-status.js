class BoersenampelStatus extends HTMLElement {
  latest = {};
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Is executed after the web component is connected to the DOM 
  connectedCallback() {
    fetch("https://christiankozalla.com/boersenampel.json")
      .then((res) => res.json())
      .then((response) => {
        const updateIds = response.result.map((item) => item["update_id"]);
        console.log(updateIds);
        this.latest = response.result.find((item) => item["update_id"] === Math.max(...updateIds))?.message;
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (!this.latest) return console.error("Did not find latest message");
        const template = document.createElement("template");
        template.innerHTML = `<div style="margin: 2rem auto; max-width: 100%; font-size: 1.1rem; padding: 2rem; border: 3px solid #ff6b35">${
          this.render({ text: this.latest.text, actions: this.latest.entities })
        }</div>`;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      });
  }

  render({ text, actions }) {
    // input.slice is working from beginning to end,
    // so the actions (text styles) are applied from beginning to end (to avoid messing up index offsets)
    for (let i = actions.length - 1; i >= 0; i--) {
      text = this.apply(text, actions[i]);
    }
    return text.replaceAll("\n", "<br>");
  }

  apply(input, action) {
    const start = input.slice(0, action.offset);
    const inner = input.slice(action.offset, action.offset + action.length);
    const end = input.slice(action.offset + action.length);
    switch (action.type) {
      case "bold":
        return `${start}<strong>${inner}</strong>${end}`;
      case "text_link":
        return `${start}<a href="${action.url}" rel="noreferrer,noopener" target="_blank">${inner}</a>${end}`;
      default:
        return input;
    }
  }
}

customElements.define("boersenampel-status", BoersenampelStatus);
