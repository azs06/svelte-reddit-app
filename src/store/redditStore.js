import { createMachine, assign } from 'xstate';

function invokeFetchSubreddit(context) {
    const { subreddit } = context;
  
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((response) => response.json())
      .then((json) => json.data.children.map((child) => child.data));
}

export const redditMachine = createMachine({
  id: 'reddit',
  initial: 'idle',
  context: {
    subreddit: null,
    posts: [],
  },
  states: {
    idle: {},
    selected: {
        initial: 'loading',
        states: {
            loading: {
                invoke: {
                    id: 'fetch-subreddit',
                    src: invokeFetchSubreddit,
                    onDone: {
                        target: 'loaded',
                        actions: assign({
                            posts: (context, event) => {
                                return  event.data
                            }
                        })
                    },
                    onError: 'failed'
                }
            },
            loaded: {},
            failed: {}
        }
    }
  },
  on: {
      SELECT: {
          target: '.selected',
          actions: assign({
            subreddit: (context, event) => {
                console.log(context);
                return event.name;
            }
          })
      }
  }
});