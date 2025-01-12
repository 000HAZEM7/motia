import { randomUUID } from 'crypto'
import { Express } from 'express'
import fs from 'fs'
import zodToJsonSchema from 'zod-to-json-schema'
import { Emit } from '..'
import { Step } from './config.types'
import { isApiStep, isEventStep, isNoopStep } from './guards'
import { getStepLanguage } from './get-step-language'

type FlowListResponse = {
  id: string
  name: string
}

type FlowStepResponse = {
  id: string
  name: string
  type: 'base' | 'trigger' | 'noop'
  description?: string
  subscribes?: string[]
  emits: Emit[]
  action?: 'webhook' | 'cron'
  webhookUrl?: string
  bodySchema?: any
  cron?: string
  language?: string
  nodeComponentPath?: string
}

type FlowResponse = FlowListResponse & {
  steps: FlowStepResponse[]
}

export const generateFlowsList = (steps: Step[]): FlowResponse[] => {
  const list: FlowResponse[] = []
  const flowStepsMap = steps.reduce(
    (mappedSteps, step) => {
      const flowNames = step.config.flows // Now an array

      if (!flowNames || flowNames.length === 0) {
        throw Error(`Invalid step config in ${step.filePath}, at least one flow name is required`)
      }

      // Add step to each flow it belongs to
      flowNames.forEach((flowName: string) => {
        if (flowName in mappedSteps) {
          mappedSteps[flowName].push(step)
        } else {
          mappedSteps[flowName] = [step]
        }
      })

      return mappedSteps
    },
    {} as Record<string, Step[]>,
  )

  Object.keys(flowStepsMap).forEach((flowId) => {
    const steps: FlowStepResponse[] = []
    const flowSteps = flowStepsMap[flowId]

    flowSteps.forEach((step) => {
      if (isApiStep(step)) {
        steps.push({
          id: randomUUID(),
          type: 'trigger',
          name: step.config.name,
          description: step.config.description,
          emits: [...step.config.emits, ...(step.config.virtualEmits ?? [])],
          subscribes: step.config.virtualSubscribes ?? undefined,
          action: 'webhook',
          language: getStepLanguage(step.filePath),
          webhookUrl: `${step.config.method} ${step.config.path}`,
          bodySchema: step?.config.bodySchema ? zodToJsonSchema(step.config.bodySchema) : undefined,
        })
        // } else if (isCronStep(step)) {
        //   steps.push({
        //     id: randomUUID(),
        //     type: 'trigger',
        //     name: step.config.name,
        //     description: step.config.description,
        //     emits: step.config.emits,
        //     action: 'cron',
        //     cron: step.config.cron,
        //   })
      } else if (isEventStep(step) || isNoopStep(step)) {
        const filePathWithoutExtension = step.filePath.replace(/\.[^/.]+$/, '')
        const tsxPath = filePathWithoutExtension + '.tsx'
        const nodeComponentPath = fs.existsSync(tsxPath) ? tsxPath : undefined

        if (isEventStep(step)) {
          steps.push({
            id: randomUUID(),
            type: 'base',
            name: step.config.name,
            description: step.config.description,
            emits: [...step.config.emits, ...(step.config.virtualEmits ?? [])],
            subscribes: step.config.subscribes,
            language: getStepLanguage(step.filePath),
            nodeComponentPath,
          })
        } else {
          steps.push({
            id: randomUUID(),
            type: 'noop',
            name: step.config.name,
            description: step.config.description,
            emits: step.config.virtualEmits,
            subscribes: step.config.virtualSubscribes,
            nodeComponentPath,
          })
        }
      }
    })

    list.push({ id: flowId, name: flowId, steps })
  })

  return list
}

export const flowsEndpoint = (steps: Step[], app: Express) => {
  const list = generateFlowsList(steps)

  app.get('/flows', async (_, res) => {
    res.status(200).send(list.map(({ id, name }) => ({ id, name })))
  })

  app.get('/flows/:id', async (req, res) => {
    const { id } = req.params as { id: string }
    const flow: FlowListResponse | undefined = list.find((flow) => flow.id === id)

    if (!flow) {
      res.status(404).send({ error: 'Flow not found' })
    } else {
      res.status(200).send(flow)
    }
  })
}
