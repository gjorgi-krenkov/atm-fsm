import { useMachine } from '@xstate/react';
import { atmMachine } from './machines/atm';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { CollectCash, InsertCard, RemoveCard, ThankYou } from './pages/Landing';
import { UnauthMenu } from './components/UnauthMenu';
import { AuthMenu } from './components/AuthMenu';
import { IncorrectPin } from './components/IncorrectPin';
import { Balance } from './components/Balance';
import { WithdrawMenu } from './components/WithdrawMenu';
import { DifferentAmount } from './components/DifferentAmount';
import { DepositCash } from './components/DepositCash';
import { DepositSuccess } from './components/DepositSuccess';
import { ProcessRequest } from './components/ProcessRequest';
import { InsufficientFunds } from './components/InsufficientFunds';
import { InsertCash } from './components/InsertCash';
import { CountingCash } from './components/CountingCash';
import useButtonPressed from './useButtonPressed';


function App() {
  const [state, send] = useMachine(atmMachine);
  useButtonPressed();
  return (
    <>
      {(
        state.matches('Authorized Menu')
        || state.matches('Check balance')
      ) && <AuthMenu
          userId="Gjorgi Krenkov"
          logout={() => send({ type: 'cancel' })}
          openCheckBalance={() => send({ type: 'openCheck' })}
          openDeposit={() => send({ type: 'openDeposit' })}
          openWithdraw={() => send({ type: 'openWithdraw' })}
        />}
      {state.matches("Show Balance") && <Balance balance={state.context.balance} logout={() => send({ type: 'cancel' })} back={() => send({ type: 'back' })} />}
      {state.matches("Incorrect Pin") && <IncorrectPin logout={() => send({ type: 'cancel' })} back={() => send({ type: 'back' })} />}
      {state.matches('Insert Card') && <InsertCard onClick={() => send({ type: "CardInserted" })} />}
      {(
        state.matches('Unauthorized Menu')
        || state.matches('Authorizing')
      ) && (
          <UnauthMenu
            onAuth={(userId) => {
              send({ type: 'updateUserId', userId });
              send({ type: 'authorize' });
            }}
          />)
      }
      {
        (
          state.matches("Check balance")
          || state.matches("TryWithdraw")
          || state.matches('Authorizing')
          || state.matches('TryDeposit')
          || state.matches('TryDiffWithdraw')
        ) && <ProcessRequest />
      }
      {
        state.matches('Canceled by User') && <ThankYou />
      }
      {
        (
          state.matches('Withdraw')
          || state.matches("TryWithdraw")
        ) && <WithdrawMenu
          withdraw={(withdrawAmount: number) => {
            send({ type: 'updateWithdrawAmount', withdrawAmount });
            send({ type: 'withdraw' })
          }}
          openDiffAmount={() => send({ type: 'openDiffAmount' })}
          logout={() => send({ type: 'cancel' })}
          back={() => send({ type: 'back' })} />
      }
      {
        state.matches('Withdraw Success') && <CollectCash />
      }
      {
        (
          state.matches('Withdraw Different Amount')
          || state.matches('TryDiffWithdraw')
        )
        && <DifferentAmount
          withdraw={(withdrawAmount: number) => {
            send({ type: 'updateWithdrawAmount', withdrawAmount });
            send({ type: 'withdrawDiffAmt' })
          }}
          logout={() => send({ type: 'cancel' })}
          back={() => send({ type: 'back' })}
        />
      }
      {
        state.matches('Withdraw Fail') && <InsufficientFunds
          balance={state.context.balance}
          requested={state.context.withdrawAmount}
          openDiffAmount={() => send({ type: 'openDiffAmount' })}
          logout={() => send({ type: 'cancel' })}
          back={() => send({ type: 'back' })} />
      }
      {(
        state.matches('Insert Cash')
        || state.matches('Count Cash')
      ) && <InsertCash confirm={() => {
        send({ type: 'updateDepositAmount', depositAmount: 500 });
        send({ type: 'confirmInsert' });
      }} back={() => send({ type: 'cancel' })} />
      }
      {state.matches('Remove Card') && <RemoveCard />}
      {state.matches('Collect Cash') && <CollectCash />}
      {state.matches('Count Cash') && <CountingCash />}
      {
        (state.matches('Deposit')
          || state.matches('TryDeposit')
        ) && <DepositCash amount={state.context.depositAmount} confirm={() => send({ type: 'deposit' })} cancel={() => send({ type: 'cancel' })} />
      }
      {state.matches('Deposit Success') && <DepositSuccess logout={() => send({ type: 'cancel' })} back={() => send({ type: 'back' })} />}

    </>
  )
}

export default App
