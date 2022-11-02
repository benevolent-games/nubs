
🔘 nubs
=======

*✨ mobile-friendly thumstick ui*

🕹️ [live demo](https://nubs.benevolent.games/)

- easy html installation
  ```html
  <!-- install nubs via html -->
  <script type="module" src="https://unpkg.com/@benev/nubs/x/nubs.js"></script>

  <!-- actual usage on the page -->
  <div>
    <nub-stick class="left"></nub-stick>
    <nub-stick class="right"></nub-stick>
  </div>
  ```

- advanced js installation
  ```sh
  npm install @benev/nubs
  ```
  ```js
  import {NubStick} from "@benev/nubs/nubsticks/nub-stick.js"
  customElements.define("nub-stick", NubStick)
  ```
