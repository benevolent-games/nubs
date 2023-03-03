
import {NubEditor} from "./elements/editor/element.js"
import {NubContext} from "./elements/context/element.js"
import {NubPointer} from "./elements/pointer/element.js"
import {NubKeyboard} from "./elements/keyboard/element.js"
import {NubGridboard} from "./elements/gridboard/element.js"
import {NubVisualizer} from "./elements/visualizer/element.js"

export const getElements = () => ({
	NubEditor,
	NubContext,
	NubPointer,
	NubKeyboard,
	NubGridboard,
	NubVisualizer,
})
