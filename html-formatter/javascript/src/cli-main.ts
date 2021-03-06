import {
  BinaryToMessageStream,
  messages,
  NdjsonToMessageStream,
} from '@cucumber/messages'
import program from 'commander'
import p from '../package.json'
import { pipeline } from 'stream'
import CucumberHtmlStream from './CucumberHtmlStream'

program.version(p.version)
program.option(
  '-f, --format <format>',
  'output format: ndjson|protobuf',
  'protobuf'
)
program.parse(process.argv)

const toMessageStream =
  program.format === 'ndjson'
    ? new NdjsonToMessageStream(
        messages.Envelope.fromObject.bind(messages.Envelope)
      )
    : new BinaryToMessageStream(
        messages.Envelope.decodeDelimited.bind(messages.Envelope)
      )

pipeline(
  process.stdin,
  toMessageStream,
  new CucumberHtmlStream(
    __dirname +
      '/../../node_modules/@cucumber/react/dist/src/styles/cucumber-react.css',
    __dirname + '/../../dist/main.js'
  ),
  process.stdout,
  (err: any) => {
    if (err) {
      // tslint:disable-next-line:no-console
      console.error(err)
      process.exit(1)
    }
  }
)
