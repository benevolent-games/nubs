
import {RecentKeyStats, Stats} from "./types.js"
import {NubEffectEvent} from "../../../events/effect.js"

export function setupListeningToActionsAndRecordingStats({
		eventTarget,
		getRecentKeyStats,
		setRecentKeyStats,
		setStatsForPointer,
		setStatsForStick,
	}: {
		eventTarget: EventTarget
		getRecentKeyStats: () => RecentKeyStats
		setRecentKeyStats: (x: RecentKeyStats) => void
		setStatsForPointer: (x: Stats.Pointer) => void
		setStatsForStick: (x: Stats.Stick) => void
	}) {

	return () => NubEffectEvent
		.target(eventTarget)
		.listen(e => NubEffectEvent.switch(<NubEffectEvent>e, {

			key: event => {
				setRecentKeyStats({
					...getRecentKeyStats(),
					[event.detail.effect]: {
						time: Date.now(),
						detail: event.detail,
					},
				})
			},

			pointer(event) {
				setStatsForPointer({
					movement: event.detail.movement,
					position: event.detail.position,
				})
			},

			stick(event) {
				setStatsForStick({
					vector: event.detail.vector,
				})
			},
		}))
}
