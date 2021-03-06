import { messages } from '@cucumber/messages'
import IGherkinDocument = messages.IGherkinDocument
import { Query as CucumberQuery } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin'
import getFeatureStatus from './getFeatureStatus'

export default function hidePassedScenarios(
  documents: IGherkinDocument[],
  cucumberQuery: CucumberQuery,
  gherkinQuery: GherkinQuery
): IGherkinDocument[] {
  return documents.filter(
    (document) =>
      getFeatureStatus(document, cucumberQuery, gherkinQuery) !=
      messages.TestStepFinished.TestStepResult.Status.PASSED
  )
}
