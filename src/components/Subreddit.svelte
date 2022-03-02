<script>
    /* props */
    export let service = null;
    /* end props */

    $: context = $service ? $service.context : {};

    function send(event) {
        return service.send(event);
    }

</script>
{#if $service.matches('failed')}
    <div>
        Failed to load posts.
        <button on:click={() => send('RETRY')}>Retry?</button>
    </div>
{/if}

{#if $service.matches('loading')}
    <div>Loading ... </div>
{/if}

{#if context.posts}
    <div>
        <header>
            <h2>{context.subreddit}</h2>
            <small>
                Last updated: {context.lastUpdated}
                <button on:click={() => send('REFRESH')}>Refresh</button>
            </small>
        </header>
        <ul>
            {#each context.posts as post}
                <li>{post.title}</li>
            {/each}
        </ul>
    </div>    
{/if}