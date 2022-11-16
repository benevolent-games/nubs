
🔘 nubs
=======

nubs is a user-input system for web games.

✨ [*live demo*](https://nubs.benevolent.games/)  
🎮 listen to keyboards, mice, and gamepads  
🕹️ virtual devices thumbsticks and buttons  
📝 user-editable key bindings  

<br/>

## installation and usage

1. insert into your html `<head>`
    ```html
    <script defer type=importmap-shim src="https://unpkg.com/@benev/nubs/x/importmap.json"></script>
    <script defer type=module-shim src="https://unpkg.com/@benev/nubs/x/html.js"></script>
    <script defer src="https://unpkg.com/es-module-shims/dist/es-module-shims.wasm.js"></script>
    ```
1. now let's insert some cool nub elements into your html `<body>`
    - ```html
      <nub-stick></nub-stick>
      ```
      - it's a mobile-friendly thumbstick!
      - it will emit `nub_input` events
    - ```html
      <nub-real-mouse></nub-real-mouse>
      ```
      - this emits `nub_input` even (all the *"real"* nub elements are like that)
    - you can add a `channels` attribute to name and differentiate inputs
      ```html
      <nub-stick channels=movestick></nubstick>
      <nub-stick channels="lookstick altmode"></nubstick>
      ```
      - then, for each nub_input event, `event.detail.channels` is an array of strings
1. wrap your nub elements inside a `context`
    ```html
    <nub-context
      bindings="
        👼 Default Bindings for Hackers
        🕹️ (move) #movestick
        🕹️ (look) #lookstick
        *️⃣ (use) f, mouse_2
        *️⃣ (forward) w, up
        *️⃣ (back) s, down
        *️⃣ (left) a, left
        *️⃣ (right) d, right
      ">

      <!-- nest your nub elements in here -->
      <nub-stick></nub-stick>
      <nub-real-mouse></nub-real-mouse>

    </nub-context>
    ```
    - this is a context for user-configurable key bindings
    - it listens to `nub_input` events, and based on the bindings, it dispatches `nub_action` events
    - the `bindings` attribute specifies the default bindings
    - **the user can edit their bindings,** nubs presents ui to save, load, copy, and paste these bindings
    - the idea is that gamers can easily share bindings by merely copy-pasting these little text files

<br/>

## advanced installation

1. ```sh
    npm install @benev/nubs
    ```
1. ```js
    import {getElements, themeElements, registerElements} from "@benev/nubs/x/setup.js"

    // run customElements.define
    registerElements(

      // apply a common css theme
      themeElements(

        // get all nubs elements
        getElements()
      )
    )
    ```
