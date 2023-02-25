import {ActionController} from "./action-controller.js"

export type ActionDomWiring = {
	controller: ActionController
	startListening: () => () => void
}
