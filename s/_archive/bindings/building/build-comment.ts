
import {emojis} from "../emojis.js"

export function buildComment(comment: string) {
	return `${emojis.comment} ${comment.trim()}`
}
