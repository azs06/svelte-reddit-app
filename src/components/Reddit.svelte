<script>
    import { redditMachine } from '../store/redditStore'
    import { interpret } from 'xstate';
    import Subreddit from './Subreddit.svelte';

    const subreddits = ['', 'reactjs', 'javascript', 'svelte'];

    export let el;
    
    
    const redditService = interpret(redditMachine).start();

    $: current = $redditService ? $redditService.context: {};
    $: subreddit = current.subreddit;
    
    const { send } = redditService; 

    function handleChange(e){
        send('SELECT', { name: e.target.value });
    }
</script>

<div bind:this={el}>
    <header>
        <select on:change={handleChange}>
            {#each subreddits as subreddit}
                <option 
                    value={subreddit} 
                    disabled={!subreddit} 
                    selected={subreddit == ''}
                >
                {subreddit ? subreddit : 'select'}
                </option>
            {/each}
        </select>
    </header>
    <div>
        {#if subreddit}
            <Subreddit service={subreddit} />
        {/if}
    </div>
</div>