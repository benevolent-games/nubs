
export function findTouchAppleFriendly(
		touchId: undefined | number,
		touches: TouchList,
	) {

	if (!touchId)
		return undefined

	for (let i = 0; i < touches.length; i++) {
		const touch = touches[i]
		if (touch.identifier === touchId)
			return touch
	}
}
