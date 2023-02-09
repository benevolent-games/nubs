
import {KeyLayout} from "./key-layout.js"
import {LayoutName} from "./layout-name.js"
import {standardLayouts} from "./standard-layouts.js"

export function selectStandardLayout(name: LayoutName): KeyLayout {
	return standardLayouts[name] ?? standardLayouts.compact
}
