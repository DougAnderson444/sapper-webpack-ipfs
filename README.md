# sapper-template

Start with the sapper template. The default [Sapper](https://github.com/sveltejs/sapper) template, available for Rollup and webpack.


## Getting started


### Using `degit`

[`degit`](https://github.com/Rich-Harris/degit) is a scaffolding tool that lets you create a directory from a branch in a repository. Use either the `rollup` or `webpack` branch in `sapper-template`:

```bash
# for webpack
npx degit "sveltejs/sapper-template#webpack" my-app
```

### Add IPFS to package.json

```
   "ipfs": "^0.41.1"
```

### Adjust webpack config

Replace alias with 
```bash
    alias: {
        svelte: path.resolve('node_modules', 'svelte'),
        fs: 'graceful-fs',
        net: 'empty'
    },
```


### Running the project

However you get the code, you can install dependencies and run the project in development mode with:

```bash
cd my-app
npm install # or yarn
npm run dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

Consult [sapper.svelte.dev](https://sapper.svelte.dev) for help getting started.


