
import {Suite} from "cynic"
import {emojis} from "../emojis.js"

export function runTheseTestsOnEachBindType(
		test: (channel: keyof typeof emojis) => Suite
	) {

	return Object.fromEntries(
		(["key", "mouse", "vector2"] as (keyof typeof emojis)[])
			.map(channel => [channel, test(channel)])) }
