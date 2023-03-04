
🔘 nubs
=======

*nubs is a user-input system for web games.*

<br/>

[⚡ **live demo!** *nubs.benevolent.games*](https://nubs.benevolent.games/)  

👂 nubs listens to keyboards, mice, gamepads, etc  
🕹️ nubs has mobile-friendly virtual devices, like thumbsticks and buttons  
📝 nubs has a keybinds editor so users to customize their controls  
🔠 nubs has a grid-based menu system that is good for hotkeys  

👼 a project by [benevolent.games](https://benevolent.games/)  
💖 free and open source  

<br/>

## install nubs onto your html page

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
  - install the nubs npm package
    ```sh
    npm install @benev/nubs
    ```
  - import nubs elements, register them to the dom
    ```js
    import {getElements, registerElements, themeElements, themeCss} from "@benev/nubs"

    // run customElements.define
    registerElements(

      // apply a common css theme
      themeElements(

        // stylesheet applied into the shadow doms
        themeCss,

        // get all nub element classes
        getElements(),
      )
    )
    ```

<br/>

## how to start using nubs

1. let's add some cool nub devices to your html `<body>`
    - ```html
      <nub-stick></nub-stick>
      ```
      - it's a mobile-friendly thumbstick!
      - it will emit `nub_cause` events
    - ```html
      <nub-pointer></nub-pointer>
      ```
      - also emits `nub_cause` events
      - this one doesn't render any ui (all of the "real" devices are like this)
1. wrap your nub elements inside a `<nub-context>`
    ```html
    <nub-context>
      <nub-keyboard></nub-keyboard>
      <nub-pointer></nub-pointer>

      <nub-stick name=Stick1></nub-stick>
      <nub-stick name=Stick2></nub-stick>
    </nub-context>
    ```
    - nub-context is for grouping nub devices
      - the context will only listen to devices nested under it
      - the context may contain devices and editing ui
    - nub-context introduces `bindings`
      - bindings define the associations between "causes" and "effects"
      - nub-context has ui that allows users to edit their `bindings`
      - an example *cause* might be `KeyW`
      - an example *effect* might be `forward`
      - in most cases, you probably want your app to listen to `nub_effect` events like `forward` rather than the causes

<br/>

## understanding *cause* and *effect* in nubs

- **`nub_cause`** events:
  like keyboard key presses and mouse movements.
  all nub *devices* like `<nub-keyboard>` or `<nub-stick>` dispatch these events.
- **`nub_effect`** events:
  like "forward" or "open menu".
  these are dispatched by a `<nub-context>` element, based on the user's bindings.
  the bindings allow users to customize which *effects* are triggered by which *causes*.

<br/>

## nubs element reference

devices
- **`<nub-keyboard>`** *(real device)*
  listens to real mouse or touch inputs.
- **`<nub-pointer>`** *(real device)*
  listens to real keyboard inputs.
- **`<nub-stick>`** *(virtual device)*
  mobile-friendly thumbstick.
- **`<nub-stickpad>`** *(virtual device)*
  thumbstick area, which centers the stick wherever your touch starts.
- **`<nub-lookpad>`** *(virtual device)*
  area for tracking touch movements, to emulate a mouse.
- **`<nub-gridboard>`** *(hybrid device)*

bindings, editing, and troubleshooting
- **`<nub-context>`**
    listens for `nub_cause` events, and dispatches `nub_effect` events, based on the current `bindings`.
    only listens to `nub_cause` events nested within the nub-context element.
- **`<nub-editor>`**
    interface for users to customize their bindings.
- **`<nub-visualizer>`**
    see what's going on, which `nub_effect` events are being dispatched.
