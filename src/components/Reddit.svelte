<script>
    import { useMachine } from '@xstate/svelte';
    import { redditMachine } from '../store/redditStore'
    import { interpret } from 'xstate';

    let current;
    const subreddits = ['reactjs', 'javascript', 'svelte'];
    const redditService = interpret(redditMachine)
        .onTransition(state => {
            console.log(state);
            current = state
        }).start();
    const { subreddit, posts } = current.context;
    const { send } = redditService;  
    function handleChange(e){
        //console.log(e.target.value);
        send('SELECT', { name: e.target.value });
    }
</script>

<main>
    <header>
        <select on:change={handleChange}>
            {#each subreddits as subreddit}
                <option value={subreddit}>{subreddit}</option>
            {/each}
        </select>
    </header>
    <section>
        <h1>{current.matches('idle') ? 'Select a subreddit': subreddit}</h1>
        {@html current.matches({ selected: 'loading' }) ? '<div>Loading..</div>' : ''}
        {#if current.matches({ selected: 'loaded' })}
            <ul>
                {#each posts as post}
                    <li>{post.title}</li>
                {/each}
            </ul>
        {/if}
    </section>
</main>