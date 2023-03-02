
// import {AssignKeybind} from "../types.js"
// import {NubContext} from "../../context/element.js"
// import {Bindings} from "../../context/bindings/types/bindings.js"

// export function prepareAssignKeybind(context: NubContext): AssignKeybind {
// 	return function assignKeyBind(
// 			effect: string,
// 			keyIndex: number,
// 			cause: string,
// 		) {

// 		const {bindings} = context
// 		const notRedundant = !bindings[getMode()].key[action].some(c => c === code)

// 		// const notRedundant = (() => {
// 		// 	let redundant = false
// 		// 	for (const kindbinds of Object.values(bindings)) {
// 		// 		const isMatchingCauseFound = kindbinds.key[effect] ?.some(c => c === cause)
// 		// 		if ()
// 		// 	}
// 		// })()

// 	// 	const bindings = <Bindings>structuredClone(context.bindings)
// 	// 	const notRedundant = !bindings.key[action].some(c => c === code)

// 	// 	if (notRedundant) {
// 	// 		const isEscapeKey = code === "Escape"

// 	// 		if (isEscapeKey)
// 	// 			bindings.key[action].splice(keyIndex, 1)
// 	// 		else
// 	// 			bindings.key[action][keyIndex] = code

// 	// 		context.bindings = bindings
// 	// 	}

// 	}
// }
