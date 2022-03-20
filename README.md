```
   ____  __       __  ___         __  ___          
  / __ \/ /_     /  |/  /_  __   /  |/  /___ _____ 
 / / / / __ \   / /|_/ / / / /  / /|_/ / __ `/ __ \
/ /_/ / / / /  / /  / / /_/ /  / /  / / /_/ / /_/ /
\____/_/ /_/  /_/  /_/\__, /  /_/  /_/\__,_/ .___/ 
                     /____/               /_/      
```
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. First, clone the repository to your local machine and navigate into the folder. For example:
```bash
git clone https://github.com/JoaoPauloAntunes/oh-my-map.git
cd oh-my-map
```

2. Install all the dependencies:
```bash
yarn
```

3. Edit your environment variables
- Open the `.sample.env` file located at the root of the project
- [Create a Mapbox account](https://account.mapbox.com/auth/signup/) and [copy your public access token](https://account.mapbox.com/access-tokens/)
- Paste it in place of `123` for the `NEXT_PUBLIC_MAPBOX_KEY` variable. That line should now look like this:

```
NEXT_PUBLIC_MAPBOX_KEY=pk.ey[...the rest of your access token...]
```

- Rename the file "`.env`" (delete "`.sample`" from the file name)

4. Then run the development server:

```bash
yarn dev
# or
npm run dev
```

And open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
