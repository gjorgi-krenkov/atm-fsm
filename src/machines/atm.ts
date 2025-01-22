import { fromPromise, setup, assign } from 'xstate';
import { countdownMachine } from './countdown';

const SERVER_URL = 'http://localhost:3000';

const commonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export const atmMachine = setup({
  actions: {
    cancel: (machine) => {
      machine.context.userId = '';
      machine.context.depositAmount = 0;
      machine.context.withdrawAmount = 0;
      machine.context.balance = undefined;
    },
    back: (machine) => {
      machine.context.depositAmount = 0;
      machine.context.withdrawAmount = 0;
      machine.context.balance = undefined;
    },
  },
  guards: {
    canWithdraw: ({ context }) => {
      return context.withdrawAmount > 0;
    },
    canDeposit: ({ context }) => {
      return context.depositAmount > 0;
    },
  },
  actors: {
    authorize: fromPromise(async ({ input }: { input: { userId: string } }) => {
      const res = await fetch(`${SERVER_URL}/authorize/`, {
        method: "POST",
        headers: commonHeaders,
        body: JSON.stringify({ userId: input.userId }),
      });
      if (res.status === 200) return;
      throw new Error('Not authorized');
    }),
    checkBalance: fromPromise(({ input }: { input: { userId: string } }) => {
      return fetch(`${SERVER_URL}/checkBalance`, {
        method: "POST",
        headers: commonHeaders,
        body: JSON.stringify({ userId: input.userId })
      }).then((res) => res.json());
    }),
    runDeposit: fromPromise(async ({ input }: { input: { userId: string, depositAmount: number } }) => {
      const res = await fetch(`${SERVER_URL}/deposit`, {
        method: "POST",
        headers: commonHeaders,
        body: JSON.stringify({ userId: input.userId, depositAmount: input.depositAmount })
      });
      if (!res.ok) throw new Error("Error deposit");
      return res;
    }),
    runWithdraw: fromPromise(async ({ input }: { input: { userId: string, withdrawAmount: number } }) => {
      const res = await fetch(`${SERVER_URL}/withdraw`, {
        method: "POST",
        headers: commonHeaders,
        body: JSON.stringify({ userId: input.userId, withdrawAmount: input.withdrawAmount })
      })
      if (!res.ok) throw new Error("Error withdraw");
      return res;
    }),
    countdown: countdownMachine,
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEEAqBZAdAVQHYEMBXAFwAsB7AJwEsAvSAAnTF0IGIiyq6wBtABgC6iUAAdysasWrlcIkAA9EAFgCsAZn6YATOuUA2AIwGA7AE5+61QBoQAT0TrDlnQA5+r1f33KD+kwC+AbZoWHicFDT0EEws7ISiEPjEYNiwYJQAkhACwkgg4pLSsvJKCMpW6pjqFp6GZiaWJrYOCJr82piu2iauJuo1lnpBIRiYyCSRPDHMrGwAxvi482AANrnyhVIycvll2tr6VeomqobGBoaaZuotiOcmJpjKJrqGJvqqqtrK2iMgoXGk240Vic3IohYABEwFtiBt8nCdqVEAcjtVTudfEZrrd7Pd+P1MPozBYGh5VKTXK5-oCJlwooxZuwISwAMKkMDzADWCLEEm2JT2qMOx0xFxx-BudwQ9T0mBuyga3VcvxO6lpY3pU1BzLYrNwAHUpKQIJR8AB3PkFAXFXagMqGVXKaoVMxOhpmEmGGXOZSuDG6EndfhnVSarBspYrVaMABGdgYaQybAgsjAmGouAAbuRuRnAVHlmt44nk5QEFnc4s7blrUihQ7HK4jM8DsZ-I1tBpmvjZa56phDJ9Xmd3O9-BHMEWY6Wk+lKAtyIRcMQ0xbcNhEsk+EJNrbkcK2vofAqjNpDKpTj0B3jWsObpgTIZDo8+t5-RrggCxhyudyGDjfBVmjMBU3TTMczzAtf05HlAOA0DKygmsdjrPdEQPRtFBFdETjOCUrilO9UUsTpFTMCoDF8Z99CnP94KAkDizYDJKCoTBRBA4gADMqAAW3GWD-wQ5iVmQ6tkjQoR6yw+0cIQNEXWfPpVGUYdGgaX0zE8Z49EokkjH0fgKinY0yDNS0GAAZUIeYVlgWBwNwDMq2goSsHM01zQtGy7Ic2AJPIVDZHQvJ+SKQ8m0U-x9Ewbwel8J0jhMXwZW7PCO1UIxLClD4zJNSzfIAMXwahVmc1yoPzDzMC8oqGFK8qgpC3Awv3SLsMdDpDCHcxPlUAcTMGmw+zeKp6n9XwzFfQ4CosnzGrKiqgJ5WTOvkx1dDMJ8vQHQ4UpOX01DiwkvgHRoX20Pp5u8qymoqxZi3WDCIsFTb7m23b9H2k91V7VpDgaYkXh0k96gu5Rboah79UhXAoWoHieOQfjl1Xdb3pRWUvv637DoB3CXV8dwelJYx+i-UYsBhOE-PsuAnNW3lXptDbsfeS8n1ynSanUVV9BlHxOn6L0fh0jpuipn8adhW16YChZQJe8K2axo9OdUbnrlcPmBfSn4FQ+T5LmMk5PinWn5dh5nMbtDnny1xodb1gwZX6AMSSB04palGlv0BK2iiW8qleeu2ooUzXtb913Bb7NS4t6AbdF6bt-SnbUQSzKBKsg3MarpYEohzlqpNCmTWYbD7yg0LRdEuUwLCsGVKKfWbelOE4KkMTPi7oHPWModjKE47i+MoQSi4ZAfcCgMva0r1Xq+xtQnEwK8WysR5spldQfgDbt+iVepjMJKdrIoXyACFEJY22q7kh2ued2Obn1vsHy1rxvi8U-N7ogHMYl9yA3zvisMOMYI5dXuI7GOvN35uzGu8F07pLzvDDJeMwU4ACiw8qAMAYgBW+YkwIP2Xk-DWcDX4IP5kg+8ThOiUlcF6eomluiAOppgPBI9CFwWIeAsCT0oGP3ZlQl+PNdaIPjvecwvU1CqidB2dovcgFYFQJQOwQcpB5zcoXMYGitFyyKAvaSghoE1xfDUb6+N-pC2MhvJUg0WGeB+qcKchjtHECHiPMeyQJ5TwMZorxpiK7mNEeraKVidp4xfH9fohMECnDil4bseg1CpWypbYxOiIA5PhBE+2R5Hg7UOFeJU2gvTMO0O7ZQWhrz6G0FKJUHR+bZLhGwchHVIkKRKToEcFSqk6RqX2aknQHxXE8FYRpOl2m2kgWsCx2M+llNSjNIZ3QZQDg3vwXZBwvT9EqT4Dxmj6o+V0dVGC6jTmFR8qEtqS9ulFOiisgZ6zPjDPSpvaoEsrqhk0IENRmBDFnMtD4jiXF-ECVqiC25lp7ntUwmIl55h+nlPedU9KvwtDZQMJSAF21paAk8UjHioKLQXILlc4FwTSXkoRY8pFPT9iigxARbERFpRjV+E8XoVw0kDEJP7LhJLkbkvBaPSFvFoXEtpWKuFFoGXhIociqO3QnhNL0InUkZgviJJ+BUYknoyROBJICrh4qLQKqWUeAFOhLDvAHK434rgvmNJBu4IYJ8BzQ3OV0plzyFJ2s1Y6p0uLrq+gfEOA4dSnSCrUFDIF4rhGLMKZHMowaHV8udRGsaijo1qH2U03WqiLUKrhtCUlqN0YFJVcyxwhJ7VOGzeG11yDDVmtJJSXolEiVjHFQkJIKRyXVpXLWp56aVAjMBmsp8ThNBHB6FcbBQLMi4AXMQQh+BKAQDYFGHda6N2QBtdFdSqViR9FSiSQaFhRr3gusST4Q0zZmvDEmhVDBEbIwyCwTdo7VydPwGtNNMDZTUMkXHX0lIdpfAvJUmahITKlplnVD9X6eI-tXAwf93irULUtOh1G46A2TrAxIl20iDaNC6D4H6id-TuDfWW-Dvl0OYb-WjMdbBB07hHZxjGIHLE92eAlSpBxMQ6XSsOKopIGP82Tu41dywqCUC5JugAClmQDwG62Bozb4ciJITIVEGvUd4e8PA4rUuJzWf0pxrvmCptTDBNO4AWSrCdoH0mGYsL4KwA53T6p0i6Yy5xvAsOyjNez66MibqjLAUg3HtwpC8Thk9CkfgaGeKqL46kBxKhPK3dwzxdW6si6qB10WN1boS0uXAPFqCT0PbF9L+xYrxUaalPLKU0p9l8Fod4DR04kiVNSThKHmuUDi-gWrKaPMkdA6+U6nWkpby676fw8irDGaltZ81KGABKYA0bZjAFundlL3KAiOyds7+6IBKtaw2tSG8sHqQMlcDbrwFT6V1kGSiGh6LkFWLGeY03atphcvnK7v5geg-B6QR7gnsbebPL5kzAXzOf38ORX7+91AjcB0CtkNaauJch1VKltUSdjrJ0j3TpGlsdcSt17uyg94zWJOYV4LCTxHEvEEb8uByB5PgPkUInma4AFoZGIBl-FXZiule7KxFOcI-ddRxEl6vAYVRrrGB0i2Az7O+xOBcL0M63wvQND7VgLOjIZha4WzXJpZwN66H4AbzrlFI1t1VBYNJ3gOzIcLMrOc5Zte2vBkOPouszo89+L6cwIWRxeBeK+Sk9F+GiVApH6KmWAw3A+OYNPRkTf3l1QGKilFFHPnMMKlD5KFaMzzxll4WsXwEUG9SW8Xz+ZdCyqcQa-hhjvpYyHVYrfuqNs2+-TsBP+hYvOEOUGNxJbOBD2MLxzfHJT-uC8LQOrqSejE9SIWlJHG6vMEHs46k5nBwenv2UTj+lIauKNm87svg7O7JlgY10eg+4Z5aAc4n8DBgZBhyRagWELNitrpCRb0rgfAmMUMQEwFSEn90EXQWFvBQxkCus71UR8dnh-QOhQxQwPhE0uEeECEiEGASFc9ncOZwC2UTIXFjAfhtIPh4poM3FyCXwG9ZUjE4RMDPcdpPAZp3BKImk6lCCkl3gnxf5jInU9k-ggUvEn8jgtYylPBGh1UpQzAtlOccsVIvQXUWwTk7ByUn81IYMldnAahhw+8dofBzBagEMPxLD0NrCmCjwZCqhjIysfpSRux3QsUXB9d95-AxsidmM7oLQn8ICKhnxiJKk1BJM80vAL0DMTxcp38qtYtzsIAwDLAXC6ldY05hxvhfQnUhwRwZlKlPBvBfUrI2NVMsMcNMDfhOhGENBugDBdZPgDZTwa9dl1I1JbCqCJtlNh5nNXMn995tkcdLwcRKZODTddAAwxl4MXUfAXgCipsycn9xZltRRah-QfhElnBtlpozoGgeVFMuEbtyBTsijjjPAXR9c64RpTANt-Q9JRtwDf8pQgcQdnN4tSAFjdARY9AectUDgeg-iq9fsgTvgQTidScIT3iXsvjNAfj-AZQ6kqgPhrgvBVIxw30gggA */
  id: 'ATM',
  initial: "Insert Card",
  context: {
    userId: '',
    depositAmount: 0,
    withdrawAmount: 0,
    balance: undefined as number | undefined,
  },
  states: {
    "Unauthorized Menu": {
      on: {
        authorize: {
          target: "Authorizing",
          reenter: true
        },
        'updateUserId': {
          actions: assign({
            userId: ({ event }) => event.userId,
          }),
        },
      }
    },

    "Authorized Menu": {
      on: {
        cancel: {
          target: "Canceled by User",
          actions: [{ type: 'cancel' }],
        },

        openDeposit: {
          target: "Insert Cash",
          reenter: true
        },

        openCheck: "Check balance",

        openWithdraw: "Withdraw"
      }
    },

    "Canceled by User": {
      invoke: {
        src: 'countdown',
        input: ({ self }) => ({
          parentRef: self,
          count: 3,
        }),
        onDone: {
          target: "Insert Card",
          reenter: true
        }
      },
    },

    "Check balance": {
      invoke: {
        src: 'checkBalance',
        input: ({ context }) => ({ userId: context.userId }),
        onDone: {
          target: "Show Balance",
          actions: assign(({ event }) => event.output)
        },
        onError: {
          target: "Error Check Balance"
        }
      },
    },

    "Withdraw Success": {
      invoke: {
        src: 'countdown',
        input: ({ self }) => ({
          parentRef: self,
          count: 3,
        }),
        onDone: {
          target: "Canceled by User",
          reenter: true
        }
      },
    },

    "Withdraw Fail": {
      invoke: {
        src: 'checkBalance',
        input: ({ context }) => ({ userId: context.userId }),

        onDone: {
          actions: assign(({ event }) => event.output)
        },
      },
      on: {
        back: {
          target: "Authorized Menu",
          actions: [{ type: 'back' }],
        },
        cancel: {
          target: "Canceled by User",
          actions: [{ type: 'cancel' }],
        },
        openDiffAmount: {
          target: "Withdraw Different Amount"
        }
      }
    },

    "Deposit Success": {
      on: {
        back: {
          target: "Authorized Menu",
          actions: [{ type: 'back' }],
        },
        cancel: {
          target: "Canceled by User",
          actions: [{ type: 'cancel' }],
        },
      }
    },

    "Deposit Fail": {
      on: {
        back: {
          target: "Authorized Menu",
          actions: [{ type: 'back' }],
        },
        cancel: {
          target: "Canceled by User",
          actions: [{ type: 'cancel' }],
        },
      }
    },

    Authorizing: {
      invoke: {
        src: 'authorize',
        input: ({ context }) => ({ userId: context.userId }),

        onDone: {
          target: "Authorized Menu"
        },
        onError: {
          target: "Incorrect Pin"
        }
      },
    },

    "Show Balance": {
      on: {
        back: {
          target: "Authorized Menu",
          actions: [{ type: 'back' }],
          reenter: true
        },
        cancel: {
          target: "Canceled by User",
          actions: [{ type: 'cancel' }],
        },
      }
    },

    "Error Check Balance": {
      on: {
        back: {
          target: "Authorized Menu",
          actions: [{ type: 'back' }],
          reenter: true
        },
        cancel: {
          target: "Canceled by User",
          actions: [{ type: 'cancel' }],
        },
      }
    },

    TryDeposit: {
      invoke: {
        src: 'runDeposit',
        input: ({ context }) => ({ userId: context.userId, depositAmount: context.depositAmount }),
        onDone: {
          target: "Deposit Success"
        },
        onError: {
          target: "Deposit Fail"
        }
      },
    },

    Deposit: {
      on: {
        deposit: [
          { target: 'TryDeposit', guard: 'canDeposit' },
        ],
        cancel: {
          target: "Remove Card",
          actions: [{ type: 'cancel' }],
        },
      }
    },

    TryWithdraw: {
      invoke: {
        src: 'runWithdraw',
        input: ({ context }) => ({ userId: context.userId, withdrawAmount: context.withdrawAmount }),
        onDone: {
          target: "Withdraw Success"
        },
        onError: {
          target: "Withdraw Fail"
        }
      },
    },

    TryDiffWithdraw: {
      invoke: {
        src: 'runWithdraw',
        input: ({ context }) => ({ userId: context.userId, withdrawAmount: context.withdrawAmount }),
        onDone: {
          target: "Withdraw Success"
        },
        onError: {
          target: "Withdraw Fail"
        }
      },
    },

    Withdraw: {
      on: {
        withdraw: [
          {
            target: 'TryWithdraw',
            guard: 'canWithdraw',
          },
        ],

        back: {
          target: "Authorized Menu",
          actions: [{ type: 'back' }],
          reenter: true
        },

        cancel: {
          target: "Canceled by User",
          actions: [{ type: 'cancel' }],
        },

        openDiffAmount: "Withdraw Different Amount",

        updateWithdrawAmount: {
          actions: assign({
            withdrawAmount: ({ event }) => event.withdrawAmount,
          }),

          target: "Withdraw"
        }
      }
    },

    "Insert Card": {
      on: {
        CardInserted: "Unauthorized Menu"
      }
    },

    "Withdraw Different Amount": {
      on: {
        back: {
          target: "Authorized Menu",
          actions: [{ type: 'back' }],
          reenter: true
        },
        withdrawDiffAmt: [
          {
            target: 'TryDiffWithdraw',
            guard: 'canWithdraw',
          },
        ],
        updateWithdrawAmount: {
          actions: assign({
            withdrawAmount: ({ event }) => event.withdrawAmount,
          }),

          target: "Withdraw Different Amount"
        }
      }
    },

    "Incorrect Pin": {
      on: {
        back: {
          target: "Unauthorized Menu",
          actions: [{ type: 'back' }],
          reenter: true
        },
        cancel: {
          target: "Canceled by User",
          actions: [{ type: 'cancel' }],
        },
      }
    },

    "Insert Cash": {
      on: {
        'updateDepositAmount': {
          actions: assign({
            depositAmount: ({ event }) => event.depositAmount,
          }),
        },
        confirmInsert: "Count Cash",
        cancel: {
          target: "Remove Card",
          reenter: true
        }
      }
    },

    "Remove Card": {
      invoke: {
        src: 'countdown',
        input: ({ self }) => ({
          parentRef: self,
          count: 3,
        }),
        onDone: {
          target: "Collect Cash",
          reenter: true
        }
      },
    },

    "Collect Cash": {
      invoke: {
        src: 'countdown',
        input: ({ self }) => ({
          parentRef: self,
          count: 4,
        }),
        onDone: {
          target: "Canceled by User",
          reenter: true
        }
      },
    },

    "Count Cash": {
      invoke: {
        src: 'countdown',
        input: ({ self }) => ({
          parentRef: self,
          count: 5,
        }),
        onDone: {
          target: "Deposit",
          reenter: true
        }
      },
    }
  },
});