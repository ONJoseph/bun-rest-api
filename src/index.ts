import { Elysia, t} from "elysia";
import { plugin } from "./plugin"
import { signinDTO } from "./models";

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

  // user
  app.group('/user', app => app
  .post('/sign-in', ({body}) => body, {
    body: signinDTO,
    response: signinDTO
  })
  .post('/sign-up', () => "Signup Route")
  .post('/profile', () => "Profile Route")
  .get('/id', () => 'User by id Route')
  )

  app.group('/v1', app => app
  .get('/', () => "Version 1")
  .group('/products', app => app
  .post('/', () => "Create PRODUCT")
  .get('/:id', () => "UPDATE PRODUCT by id")
  .get('/:id', ({params: {id}}) => {
    return id
  },
  {
    params: t.Object({
      id: t.Numeric()
    })
  }
  )
  .put(':/id', () => "UPDATE Product by id")
  .delete('/:id', () => "DELETE Product by id")
  )
  )

  app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
