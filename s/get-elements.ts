
import {NubStick} from "./elements/stick/element.js"
import {NubEditor} from "./elements/editor/element.js"
import {NubContext} from "./elements/context/element.js"
import {NubLookpad} from "./elements/lookpad/element.js"
import {NubPointer} from "./elements/pointer/element.js"
import {NubStickpad} from "./elements/stickpad/element.js"
import {NubKeyboard} from "./elements/keyboard/element.js"
import {NubGridboard} from "./elements/gridboard/element.js"
import {NubVisualizer} from "./elements/visualizer/element.js"
import {NubStickGraphic} from "./elements/stick-graphic/element.js"

export const getElements = () => ({
	NubStick,
	NubEditor,
	NubContext,
	NubLookpad,
	NubPointer,
	NubKeyboard,
	NubStickpad,
	NubGridboard,
	NubVisualizer,
	NubStickGraphic,
})
