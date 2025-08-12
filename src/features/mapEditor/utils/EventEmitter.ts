//refered from Mitt package

import type { EmitterType } from '../types/types'

type EventType = string
type Handler<T = unknown> = (event: T) => void

type EventHandlerList<T = unknown> = Array<Handler<T>>
export type WildcardHandler<T = Record<string, unknown>> = (
   type: keyof T,
   event: T[keyof T],
) => void
export type WildCardEventHandlerList<T = Record<string, unknown>> = Array<WildcardHandler<T>>

type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
   keyof Events | '*',
   EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>

//interface

interface IEmitter<Events extends Record<EventType, unknown>> {
   // map: EventHandlerMap<Events>
   on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void
   on(type: '*', handler: WildcardHandler<Events>): void

   off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void
   off(type: '*', handler: WildcardHandler<Events>): void

   emit<Key extends keyof Events>(type: Key, event: Events[Key]): void
   emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void
}
type GenericEventHandler<Events extends Record<EventType, unknown>> =
   | Handler<Events[keyof Events]>
   | WildcardHandler<Events>

export class Emitter<Events extends Record<EventType, unknown>> implements IEmitter<Events> {
   private map: EventHandlerMap<Events> = new Map()

   on<Key extends keyof Events>(type: Key, handler: GenericEventHandler<Events>): void {
      const handlers: Array<GenericEventHandler<Events>> | undefined = this.map.get(type)
      if (handlers) {
         handlers.push(handler)
      } else {
         this.map.set(type, [handler] as EventHandlerList<Events[keyof Events]>)
      }
   }
   off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler<Events>): void {
      const handlers: Array<GenericEventHandler<Events>> | undefined = this.map.get(type)
      if (handlers) {
         if (handler) {
            const index = handlers.indexOf(handler)
            if (index >= 0) {
               handlers.splice(index, 1)
            }
         } else {
            this.map.set(type, [])
         }
      }
   }
   emit<Key extends keyof Events>(type: Key, event?: Events[Key]): void {
      let handlers = this.map.get(type)

      if (handlers) {
         ;(handlers as EventHandlerList<Events[keyof Events]>)
            .slice()
            .map((handler) => handler(event!))
      }
      handlers = this.map.get('*')
      if (handlers) {
         ;(handlers as WildCardEventHandlerList<Events>)
            .slice()
            .map((hander) => hander(type, event!))
      }
   }
}

const emitter = new Emitter<EmitterType>()
export default emitter
