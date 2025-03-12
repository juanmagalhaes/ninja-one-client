This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Stack

This project most important tools are:

- pnpm 9
- react 19
- next.js 15
- tailwind 4

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

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

```base
pnpm test:unit
```

## E2E tests

So far only the setup is done and there is just an example test that I used to verify that the configuration mostly done.

## Things to check

### I added a UI for when the list is empty

To see it, delete every device manually or change "devices.json" in the API code for an empty list and restart the API, reload the main page, there you go.

<img width="956" alt="image" src="https://github.com/user-attachments/assets/bb5da210-17f4-4ab2-8d05-f921c367fe71" />

### I've also added several loading UI for when network operations are in progress, such as:

<img width="967" alt="image" src="https://github.com/user-attachments/assets/6a64f55c-93cb-4263-a456-4483940cb890" />

<img width="628" alt="image" src="https://github.com/user-attachments/assets/5e2e205d-f29f-479e-b558-912efe4cf17e" />
