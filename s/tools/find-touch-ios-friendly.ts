
export function findTouchAppleFriendly(
		pointerId: undefined | number,
		pointers: PointerEvent[],
	) {

	if (pointerId === undefined)
		return undefined

	for (let i = 0; i < pointers.length; i++) {
		const pointer = pointers[i]
		if (pointer.pointerId === pointerId)
			return pointer
	}
}
