
import {ReadableSet} from "./readable-set.js"
import {SetWritingFunctions} from "./set-writing-functions.js"

export type WritableSet<T> = (
	& ReadableSet<T>
	& SetWritingFunctions<T>
)
