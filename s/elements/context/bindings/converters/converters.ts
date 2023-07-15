
import {converter_1} from "./1.js"
import {BindingsConverter} from "../types/bindings-converter.js"

export const converters = new Map<number, BindingsConverter<any, any>>()
	.set(1, converter_1)
