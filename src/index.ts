import { Elysia } from "elysia";
import { plugin } from "./plugin"

// Application
const app = new Elysia()
  .get("/", () => "Hello Bun Dev, I am going to build RESTful APIs")
  .use(plugin)
  .state({
    id: 1,
    email: 'jane@gmail.com'
  })
  .decorate('getDate', () => Date.now())
  .get('/post/:id', ({ params: { id } }) => {
    return { id, title: 'Learn Bun!' };
  })
  .post('/post', ({body, set, store}) => {
    console.log(store)
    set.status = 201
    return body
  })
  .get('/track/*', () => {return 'Track Route'})
  .get('/tracks', ({store, getDate}) => {
    console.log(store)
    console.log(getDate())
    console.log(store['plugin-version'])
    return new Response(JSON.stringify({
      "tracks": [
        'Dancing Feat',
        'San I',
        'Animals',
        'New Song'
      ]
    }), {
      headers:{
        'Content-Type': 'application/json'
    }
    })
  }) 
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
