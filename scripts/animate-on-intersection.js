class AnimateOnIntersection extends HTMLElement {
  selector;
  preset; // { onInit: [property, value][], onIntersect: [property, value][] }

  constructor() {
    super();
    if (this.hasAttribute("selector") && this.hasAttribute("effect")) {
      // selector should be a valid CSS selector
      this.selector = this.getAttribute("selector");
      const elements = document.querySelectorAll(this.selector);
      const effect = this.getAttribute("effect");
      this.preset = this.savePreset(effect);

      const observer = new IntersectionObserver((entries, ref) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.preset.onIntersect.forEach(([prop, value]) => entry.target.style[prop] = value);
            ref.unobserve(entry.target);
          }
        });
        // , { rootMargin: "70% 0px 10% 0px" }
      });

      elements.forEach((el) => {
        this.preset.onInit.forEach(([prop, value]) => { el.style[prop] = value; });
        observer.observe(el);
      });
    }
  }

  presets = {
    fadeIn: {
      transform: ["translateY(100px)", "translateY(0px)"],
      transition: ["opacity 2s ease, transform 1s ease"],
      opacity: ["0", "1"]
    }
  }

  savePreset(effect) {
    const preset = this.presets[effect];
    const properties = Object.keys(preset);
    return {
      onInit: properties.map((prop) => ([prop, preset[prop][0]])).filter(([_, value]) => Boolean(value)),
      onIntersect: properties.map((prop) => ([prop, preset[prop][1]])).filter(([_, value]) => Boolean(value))
    };
  }

  apply(el, effect) {

    return {
      initial: styles
    }
  }
}

customElements.define("animate-on-intersection", AnimateOnIntersection);