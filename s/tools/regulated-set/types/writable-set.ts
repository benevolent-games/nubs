
import {ReadableSet} from "./readable-set.js"
import {SetWritingFunctions} from "./set-writing-functions.js"

export type WritableSet<X> = (
	& ReadableSet<X>
	& SetWritingFunctions<X>
	& {readable: ReadableSet<X>}
)
