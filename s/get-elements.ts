
import {NubStick} from "./elements/stick/element.js"
import {NubRealMouse} from "./elements/real/mouse.js"
import {NubEditor} from "./elements/editor/element.js"
import {NubContext} from "./elements/context/element.js"
import {NubGridMenu} from "./elements/grid/menu/element.js"
import {NubRealKeyboard} from "./elements/real/keyboard.js"
import {NubGridboard} from "./elements/gridboard/element.js"
import {NubVisualizer} from "./elements/visualizer/element.js"

export const getElements = () => ({
	NubStick,
	NubEditor,
	NubContext,
	NubGridMenu,
	NubGridboard,
	NubRealMouse,
	NubVisualizer,
	NubRealKeyboard,
})
