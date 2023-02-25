
import {KeyLayout} from "./key-layout.js"
import {compact} from "./presets/compact.js"
import {halfboard} from "./presets/halfboard.js"

export const standardLayouts = {
	compact,
	halfboard,
} satisfies {[key: string]: KeyLayout}
