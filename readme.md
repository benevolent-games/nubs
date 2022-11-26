
🔘 nubs
=======

*nubs is a user-input system for web games.*

<br/>

[⚡ **live demo!** *nubs.benevolent.games*](https://nubs.benevolent.games/)  

👂 nubs listens to keyboards, mice, gamepads, etc  
📝 nubs has ui for users to edit their own key bindings  
📣 nubs emits `nub_action` events, based on inputs and user bindings  
🕹️ nubs has mobile-friendly virtual devices, like thumbsticks and buttons  

👼 a project by [benevolent.games](https://benevolent.games/)  
💖 free and open source  

<br/>

## nubs installation

first, you have to get nubs installed onto your web page.

choose ONE path — the easy way, or the hard way:

- **the easy way** *(for html enthusiasts)*
  - install these scripts into your page's `<head>`
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
- **the advanced way** *(for web developers)*
    - install nubs npm package
      ```sh
      npm install @benev/nubs
      ```
    - import nubs elements, register them to the dom
      ```js
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

<br/>

## nubs usage

now that nubs is installed onto your web page, you can start using nub elements.

1. let's insert some cool nub elements into your html `<body>`
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
    - you can add a `name` attribute to name and differentiate inputs
      ```html
      <nub-stick name=movestick></nubstick>
      <nub-stick name=lookstick></nubstick>
      ```
      - then, for each nub_input event, name is available as `event.detail.name`
1. wrap your nub elements inside a `context`
    ```html
    <nub-context
      default-bindings="
      👼 Cool Default Bindings
      🖱️ look :: lookmouse
      🕹️ look :: lookstick
      🕹️ move :: movestick
      *️⃣ forward :: KeyW ArrowUp
      *️⃣ backward :: KeyS ArrowDown
      *️⃣ leftward :: KeyA ArrowLeft
      *️⃣ rightward :: KeyD ArrowRight
      *️⃣ jump :: Space
      *️⃣ use :: KeyF Mouse3
      *️⃣ primary :: Mouse1
      *️⃣ secondary :: Mouse2
      ">

      <!-- group nub elements together into a context! -->

      <nub-real-keyboard></nub-real-keyboard>
      <nub-real-mouse name=lookmouse></nub-real-mouse>

      <nub-stick name=movestick></nub-stick>
      <nub-stick name=lookstick></nub-stick>
    </nub-context>
    ```
    - nub-context is for grouping nub inputs
      - the context will only listen to inputs nested under it
      - the context may contain virtual devices and editing ui
      - `nub-real-*` elements render nothing and do not appear
    - nub-context introduces key `bindings`
      - bindings define the associations between "inputs" and "actions"
      - nub-context has ui that allows users to edit their `bindings`
      - an example input might be `KeyW`
      - an example action might be `forward`
      - in most cases, you probably want your app to listen to `nub_action` events like `forward` rather than the specific keys
    - `bindings` has its own funny little text format
      - it uses emojis unironically, to indicate nub types
      - it's just sugar for a JSON format that operates under the hood
      - it's intended for users to be able to copy-paste these bindings files, to easily share them over discord or whatever

<br/>

## nub elements documentation

coming soon lol

- `<nub-context>`
- `<nub-real-mouse>`
- `<nub-real-keyboard>`
- `<nub-stick>`
- `<nub-gridboard>`
- `<nub-editor>`
