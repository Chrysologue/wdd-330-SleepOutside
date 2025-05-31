export default class Alert {
  constructor() {
    this.jsonPath = "/json/alert.json";
  }

  async show() {
    try {
      const response = await fetch(this.jsonPath);
      if (!response.ok) return;
      const alerts = await response.json();
      if (!alerts.length) return;

      const section = document.createElement("section");
      section.className = "alert-list";
      alerts.forEach(alert => {
        const p = document.createElement("p");
        p.textContent = alert.message;
        p.style.background = alert.background;
        p.style.color = alert.color;
        p.style.padding = "1em";
        p.style.marginBottom = "0.5em";
        p.style.borderRadius = "4px";
        section.appendChild(p);
      });

      const main = document.querySelector("main");
      if (main) {
        main.prepend(section);
      }
    } catch (e) {
    }
  }
}