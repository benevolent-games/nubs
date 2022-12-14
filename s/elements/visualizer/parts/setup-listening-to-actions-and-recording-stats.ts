
import {RecentKeyStats, Stats} from "./types.js"
import {NubActionEvent} from "../../../events/action.js"

export function setupListeningToActionsAndRecordingStats({
		eventTarget,
		getRecentKeyStats,
		setRecentKeyStats,
		setStatsForMouse,
		setStatsForVector2,
	}: {
		eventTarget: EventTarget
		getRecentKeyStats: () => RecentKeyStats
		setRecentKeyStats: (x: RecentKeyStats) => void
		setStatsForMouse: (x: Stats.Mouse) => void
		setStatsForVector2: (x: Stats.Vector2) => void
	}) {

	return () => NubActionEvent
		.target(eventTarget)
		.listen(e => NubActionEvent.switch(<NubActionEvent>e, {

			key: event => {
				setRecentKeyStats({
					...getRecentKeyStats(),
					[event.detail.action]: {
						time: Date.now(),
						detail: event.detail,
					},
				})
			},

			mouse(event) {
				setStatsForMouse({
					movement: event.detail.movement,
					position: event.detail.position,
				})
			},

			vector2(event) {
				setStatsForVector2({
					vector: event.detail.vector,
				})
			},
		}))
}
