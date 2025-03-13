This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Stack

This project most important tools are:

- pnpm 9
- react 19
- next.js 15
- tailwind 4
- chadcn/ui
- jest
- playwright

## Getting Started

Make sure you have `pnpm` 9 installed.

```bast
npm i -g pnpm@9
```

Make sure the data API is running. (The one provided by this challenge).

### Install dependencies

```bash
pnpm i
```

### Run development server

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

### Run build to generate folder with production assets and server:

You will need to set the env var `API_URL` to the value you want to point to and then:

```bash
pnpm build
```

You will find all of the exisiting commands on `package.json` scripts section.

No environment variable needs to be set to run the project locally cause the variables have
default values. Check `src/env/public.ts` for more info on env vars.

To add env vars for local development, add a `.env` file to the project root.

On variable in particular can be useful to test the loading indicators I added
because as the API is also ran locally the communication happens too fast.

If you want to have more time to see the loading indicators add the following env var to
your `.env` file:

```bash
# NUMBER is the amount of milliseconds you want to simulate network latency.
DEBUG_NETWORK_DELAY=NUMBER
```

## Unit tests

This project is using unit tests with jest for utility functions and other things but not for UI testing.
For the UI I decided to go with an End to End test approach using playright (This part is still pending).

```bash
pnpm test:unit
```

## E2E tests

I made enough e2e tests so that my skills can be evaluated but I didn't make 100% coverage of tests overall.
I added `TODO` comments with other tests I would have implemented given more time.

To run e2e tests locally run:

```bash
pnpm test:e2e
```

## Continuous integration

I've added a github actions setup that was running the first example e2e test I made pointing to a page on the internet
but it started to break when I told it to run the development server and point to. Due to time constraints I disabled
this pipeline config. Given more time I would have acted on it.

## Considerations

### Filtering and soring

The challenge is a front end one so I assume that I could not change the API that was given to me.

Generally I think filter/sorting is more robust when you send the filter/sort params to the server and
get the results. This makes sense for large datasets and I normally would do some sort of pagination,
infinite scrolling (some lazy loading strategy).

As the server don't support params for filter/sort, I assumed that this UI expects a smaller list of data
so I didn't add any sort of pagination whatsoever.

One nice touch I would have added if I had a bit more time would be fuzzy search with something like Fuse.js.

### The choice of next.js

The project had no constraints of libs nor did it gave context of wether or not something like SSR was an important
thing to consider for SEO purposes or anything like that.

These days when I start a new react project, if it doesn't have very specific constraints, I tend to go with Vite
for SPA apps and next.js for apps that require SSR.

Other things that made me choose next.js in this case is that it is a more complete framework and not just a bundler
with nice settings out of the box. Next.js comes with it's own router (so I wouldn't need another package for this)
and I like it's new capabilities with the latest features of server components that allow you to very quickly shoot
back static markup to the user, resolve an async data fetch on the server and stream the results back to the client.

### The choice of tailwind

I've seen people love and hate tailwind. At first I found the syntax of very long classNames very odd. After I tried
it in sompe projects though, I realized that you get very productive using it by just adding the classes to you elements
very fast and with the help of intelisense. Lot's of adoption and samples and libs built on top of it out there.

Some other important points worth mentioning is that it is only css classes so no issues with using it along with SSR
and also because it purges every class name you didn't use, you end up with very small css bundles.

It's worth mentioning that I organized the colors with a tailwind theme approach using CSS variables. Could have went
all in on it and create a dark mode with it but it would be a nice to have thing, not among the top priorities.

### chadcn/ui

You may notice a `components.json` file. I'm not very fond of blackbox UI libs like material UI or the likes unless
what you are building looks very similar to their default styles. In my experience, doing very intensive customization
on things like material UI, ant design, can get very messy very easy.

Chadn UI uses this new concept of making very simple components and importing the component code to your codebase.
Sometimes it uses libs (normally @radix-ui) but these are very simple primitives of logic. The good side of this is that
you own the ui components yourself so you can decide wether to create wrapper components overriding some styles or behaivor
or if you will directly go and change something on the building blocks to suit your needs.

## Other things I would have added next, given more time...

- More specialized error boundaries using next.js conventions
  - `error.tsx` files where needed
  - `notFound.tsx` files where needed, etc.

Right now if an error were to occur or if you try to access a non existing page you
will see the default next.js 404 and error pages.

- Responsive version of the filters section. Probably with a hamburger menu that would open a modal with the filters.

## Things to check

### I added a UI for when the list is empty

To see it, delete every device manually or change "devices.json" in the API code for an empty list and restart the API, reload the main page, there you go.

<img width="956" alt="image" src="https://github.com/user-attachments/assets/bb5da210-17f4-4ab2-8d05-f921c367fe71" />

### I've also added several loading UI for when network operations are in progress, such as:

<img width="967" alt="image" src="https://github.com/user-attachments/assets/6a64f55c-93cb-4263-a456-4483940cb890" />

<img width="628" alt="image" src="https://github.com/user-attachments/assets/5e2e205d-f29f-479e-b558-912efe4cf17e" />

### I added a global error boundary that renders the following fallback page:

<img width="402" alt="image" src="https://github.com/user-attachments/assets/6ba0603f-05ed-4d8d-9919-900b662d39fb" />

