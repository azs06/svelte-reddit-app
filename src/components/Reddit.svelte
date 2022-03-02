<script>
    import { redditMachine } from '../store/redditStore'
    import { interpret } from 'xstate';
    import Subreddit from './Subreddit.svelte';

    const subreddits = ['', 'reactjs', 'javascript', 'svelte'];
    
    let current;
    $: subreddit = ''; 
    
    const redditService = interpret(redditMachine)
        .onTransition(state => {
            current = state
            subreddit = current.context.subreddit
        }).start();

    const { send } = redditService; 

    function handleChange(e){
        send('SELECT', { name: e.target.value });
    }
</script>

<main>
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
</main>