import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TriggerLogsState = {
  messages: Record<string, { time: number; message: string; data: any }[]> // per trace id
  addMessage: (traceId: string, time: number, message: string, data: any) => void
  resetMessages: () => void
}

export const useTriggerLogs = create<TriggerLogsState>()(
  persist(
    (set) => ({
      messages: {},
      addMessage: (traceId, time, message, data) =>
        set((state) => ({
          ...state,
          messages: {
            ...state.messages,
            [traceId]: [...(state.messages[traceId] || []), { time, message, data }],
          },
        })),
      resetMessages: () => set({ messages: {} }),
    }),
    {
      name: 'trigger-logs',
    },
  ),
)
