import { globalLogger, Logger } from './logger'

export type Event<TData> = {
  type: string
  data: TData
  traceId: string
  flows: string[]
  logger: Logger
}

type Handler<TData = unknown> = (event: Event<TData>) => Promise<void>

export type EventManager = {
  emit: <TData>(event: Event<TData>, file?: string) => Promise<void>
  subscribe: <TData>(event: string, handlerName: string, handler: Handler<TData>) => void
}

export const createEventManager = (): EventManager => {
  const handlers: Record<string, Handler[]> = {}

  const emit = async <TData>(event: Event<TData>, file?: string) => {
    const eventHandlers = handlers[event.type] ?? []
    const { logger, ...rest } = event

    logger.debug('[Flow Emit] Event emitted', { handlers: eventHandlers.length, data: rest, file })
    eventHandlers.map((handler) => handler(event))
  }

  const subscribe = <TData>(event: string, handlerName: string, handler: Handler<TData>) => {
    if (!handlers[event]) {
      handlers[event] = []
    }

    globalLogger.debug('[Flow Sub] Subscribing to event', { event, handlerName })

    handlers[event].push(handler as Handler)
  }

  return { emit, subscribe }
}
