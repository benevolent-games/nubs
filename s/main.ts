
export {registerElements, themeElements} from "@chasemoskal/magical"

export * from "./types.js"
export * from "./events/input.js"
export * from "./events/action.js"
export * from "./events/bindings.js"

export {default as themeCss} from "./framework/theme.css.js"

export * from "./elements/real/mouse.js"
export * from "./elements/real/keyboard.js"
export * from "./elements/stick/element.js"
export * from "./elements/editor/element.js"
export * from "./elements/gridboard/element.js"
export * from "./elements/visualizer/element.js"

import {NubStick} from "./elements/stick/element.js"
import {NubRealMouse} from "./elements/real/mouse.js"
import {NubEditor} from "./elements/editor/element.js"
import {NubGridMenu} from "./elements/grid/menu/element.js"
import {NubRealKeyboard} from "./elements/real/keyboard.js"
import {NubGridboard} from "./elements/gridboard/element.js"
import {NubVisualizer} from "./elements/visualizer/element.js"

export const getElements = () => ({
	NubStick,
	NubEditor,
	NubContext2,
	NubGridMenu,
	NubGridboard,
	NubRealMouse,
	NubVisualizer,
	NubRealKeyboard,
})
