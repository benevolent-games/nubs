
🔘 nubs
=======

*nubs is a user-input system for web games.*  
[⚡ **try now demo!** *nubs.benevolent.games*](https://nubs.benevolent.games/)  

🎮 listen to keyboards, mice, and gamepads  
🕹️ virtual devices thumbsticks and buttons  
📝 user-editable key bindings  

👼 a project by [benevolent.games](https://benevolent.games/)  
💖 free and open source just for you  

<br/>

## installation and usage

1. insert into your html `<head>`
    ```html
    <script
      type=importmap-shim
      src="https://unpkg.com/@benev/nubs/x/importmap.json"
      defer
    ></script>
    <script
      type=module-shim
      src="https://unpkg.com/@benev/nubs/x/html.js"
      defer
    ></script>
    <script
      src="https://unpkg.com/es-module-shims/dist/es-module-shims.wasm.js"
      defer
    ></script>
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
      - also emits `nub_input` events
      - this one doesn't render any ui (all of the "real" elements are like this)
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
      👼 Cool Default Bindings
      🕹️ look :: #look
      🕹️ move :: #move
      *️⃣ forward :: KeyW ArrowUp
      *️⃣ backward :: KeyS ArrowDown
      *️⃣ leftward :: KeyA ArrowLeft
      *️⃣ rightward :: KeyD ArrowRight
      *️⃣ jump :: Space
      *️⃣ use :: KeyF Mouse3
      *️⃣ primary :: Mouse1
      *️⃣ secondary :: Mouse2
      ">

      <!-- nest your nub elements in here -->
      <nub-real-keyboard></nub-real-keyboard>
      <nub-real-mouse channels=look></nub-real-mouse>
      <nub-stick channels=look></nub-stick>
      <nub-stick channels=move></nub-stick>
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
    import {getElements, themeElements, registerElements} from "@benev/nubs"

    // run customElements.define
    registerElements(

      // apply a common css theme
      themeElements(

        // get all nubs elements
        getElements()
      )
    )
    ```
