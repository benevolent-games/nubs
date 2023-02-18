
import {Bindings} from "./bindings.js"

import gearSvg from "../../../../framework/icons/akar/gear.svg.js"
import blockSvg from "../../../../framework/icons/akar/block.svg.js"

export const modes = {

	home: {
		menu: {
			icon: gearSvg,
		},
	},

	menu: {
		back: {
			icon: blockSvg,
		},
	},

} satisfies {[mode: string]: Bindings}
