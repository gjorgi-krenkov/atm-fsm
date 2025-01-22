import { setup, assign, sendTo, ActorRef, Snapshot } from 'xstate';

const guards = {
  canCountDown: ({ context }) => context.count !== 0,
  countingFinished: ({ context }) => context.count === 0
}

type ParentActor = ActorRef<Snapshot<unknown>, any>;

export const countdownMachine = setup({
  actions: {
    countdown: assign({ count: machine => machine.context.count - 1 }),
    notifyParent: sendTo(({ context }) => context.parentRef, ({ context }) => ({
      type: 'countdownUpdate',
      data: context.count,
    }))
  },
  guards
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BXAdgFwqg7pgHRpbYCWmUAxAMoAqA8gAoDaADALqKgAOqschVSYeIAB6IAzAEYArEXYyATAE45yqe2UA2WXJ0AaEAE9EyuQA4il5Wpk7HTx1IC+r46Rx5CJDDkoaDm4kEH5BYVFQyQRlWyIAdnZZC2MzWJUbO1UHZ2d3T39cAmIvCipqcVhsAENsMCIagDN6gCcAChl2boBKajKfUqLA4LFwoXIRMRiAFmU0xBVrOXcPEExUCDgxAZKxgQmp6MQAWiNTU51FbuTVdh1bGUsdXQKQXd8ywP2IyajQGJdZQ2OTyF5yBaxDREO7gt4fYh4TBgH6Hf4SRAzGYJIhxFQQi5Q9hEGb3CyrVxAA */
  id: "countdown",
  initial: 'counting',
  context: ({ input }) => input ?? {
    count: 0 as number,
    parentRef: undefined as ParentActor | undefined
  },
  states: {
    counting: {
      entry: 'notifyParent',
      after: {
        "1000": {
          target: "counting",
          actions: ["countdown"],
          guard: "canCountDown",
          reenter: true,
        },
      },
      always: {
        target: 'done',
        guard: "countingFinished",
      },
      on: {
        STOP: {
          target: "done",
          reenter: false
        },
      }
    },
    done: {
      type: "final"
    }
  }
}) 