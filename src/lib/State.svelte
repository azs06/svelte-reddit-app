<script>
  import { useMachine } from '@xstate/svelte';
  import { createMachine, interpret } from 'xstate';

  const toggleMachine = createMachine({
    id: 'toggle',
    initial: 'inactive',
    states: {
      inactive: {
        on: { TOGGLE: 'active' }
      },
      active: {
        on: { TOGGLE: 'inactive' }
      }
    }
  });

  const { state, send } = useMachine(toggleMachine);
</script>

<button on:click={() => send('TOGGLE')}>
    {$state.value === 'inactive'
      ? 'Click to activate'
      : 'Active! Click to deactivate'}
  </button>