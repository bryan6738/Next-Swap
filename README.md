# Introduction

Criptic is a Web3 NFT Crypto Dashboard Template built with React, NextJS, TypeScript, and Tailwind CSS.

## Navigation

You can find different topics in the table of contents. On desktop, you should see it in the left
sidebar. On mobile, you should see it after pressing an icon with Hamberger in the top right
corner.

## Supported Platforms

Compatible Browsers (Firefox, Safari, Chrome, Edge)

Node.js 16.15.1 or later

MacOS, Windows (including WSL), and Linux are supported

## Requirements

- node(16.15.1 or later)
- yarn
- editor: VS code (recommended)

## Installation

For getting started with the template you have to follow the below procedure: Open project directory and run below command.

```sh
yarn install

yarn dev
```

This will start the server at [http://localhost:3000](http://localhost:3000/). Open [http://localhost:3000](http://localhost:3000/)[ ](http://localhost:3000/)to view it in the browser.

## Available Scripts:

You can run below commands in the root folder for your need.

```sh
"clean": "rimraf \"{node_modules,.next,out.cache}\"",
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint",
"prepare": "husky install"
```

## Technologies we used

- [NextJs](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)[ ](https://tailwindcss.com/)[CSS](https://tailwindcss.com/)
- [Jotai](https://jotai.org/)
- [Recharts](https://recharts.org/)
- [web3modal](https://web3modal.com/)

## For customizing the template's default site settings:

- To customize tailwind configuration go to -> `tailwind.config.js` file.

- `/public`: To change your app favicon images here.

- `/src/assets`: We managed our css & images in this directory.

- `/src/components`: This folder contains all the app related components.

- `drawer-views`: We managed all of our side Drawer's view, context api & drawer UI in
  this folder.

- `modal-views`: We managed all of our modal's view, context api & modal UI in this
  folder.

- `icons`: Our app's custom svg icons components directory, if you need any then add
  your custom svg icon components here.

- `ui`: This folder contains common reusable ui components.

- `/src/config`: This folder contains all necessary configuration related for this app.

- `/src/data`: It's contain all of our app's static data.

- `/src/layout`: It's contain all layouts and layout's related components like header,
  sidebar, container and etc.

- `/src/lib`: This folder contains constants, hooks, framer motion & general utils
  functions.

- `/src/app`: All the pages created inside app directory page.tsx files which is used by nextjs app routing mechanism.

- `/src/types`: Reusable function & component's types are located in this folder.

## For Adding a custom Icon:

To add a custom icon please follow this procedure.

1.  Open your custom SVG icon file in the code editor and copy all the code.

2.  Then go to `src -> components -> icons` folder and create a new .tsx file.

3.  Then here create a function component and paste your copied SVG code inside the return
    statement.

4.  Then covert all the SVG's kebab-cases properties into camelCase format except the data-
    name property. For ex. change the stroke-width and fill-color into strokeWidth and fillColor.
    (for reffernce you can see one of our icon. )

5.  If your custom SVG code has any single custom color then change them into fillColor.

## New Static Page

Out template is built React and NextJS framework. So all the existing pages are available to this

location. You can create new pages from:

`criptic/src/app/new-page/page.tsx`

You can use the NextJS app routing feature for the new pages. Check these official NextJS docs for
pages and routing,

- <https://nextjs.org/docs/app/building-your-application/routing/defining-routes>

In this template, We have used some custom helper functions which is located in

`[your-frontend-project]/src/utils/`

You can use or customize these helper functions according to your needs.

## Vercel Deployment

Check out [Next.js](https://nextjs.org/docs/deployment)[ ](https://nextjs.org/docs/deployment)[deployment](https://nextjs.org/docs/deployment)[ ](https://nextjs.org/docs/deployment)[documentation](https://nextjs.org/docs/deployment)[ ](https://nextjs.org/docs/deployment)for more details. deploy

## SEO

You can check next js metadata api for SEO

<https://nextjs.org/docs/app/building-your-application/optimizing/metadata>

We have not used any analytics integration in this template yet. But, you can easily integrate any

analytics using [Next](https://github.com/vercel/next.js/tree/canary/examples)[ ](https://github.com/vercel/next.js/tree/canary/examples)[JS](https://github.com/vercel/next.js/tree/canary/examples)[ ](https://github.com/vercel/next.js/tree/canary/examples)[examples](https://github.com/vercel/next.js/tree/canary/examples).

## Support

There are some basic requirements for our application so that support team can help you
quick such as,

1. Asking queries regarding feature that is already implemented in the application

2. Following recommended configuration, environments & server which you need to met first
   before you proceed with installation, deployment in your server to receive support.

3. [Support](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[query](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[need](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[to](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[be](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[within](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[Envato](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[item](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[support](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[policy.](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[(](https://themeforest.net/page/item_support_policy)[https://themeforest.net/page/i](https://themeforest.net/page/item_support_policy)
   [tem_support_policy](https://themeforest.net/page/item_support_policy)[)](https://themeforest.net/page/item_support_policy)

4. You should maintain only one support ticket at a time. Creating multiple ticket can cause
   unexpected delays.

5. Ticket should provide as much details as possible related to the issue such as screenshot,
   video explanation, access, how to reproduce, environments, if any changes or customizations are made etc
   During working days our ticket response can take 24 hours to 48 hours depending on the

   [volume](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[of](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[tickets](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[pending](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[prior](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[to](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[your](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[ticket](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[.](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[We](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[follow](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[Envato](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[Item](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[support](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[policy](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[https://](https://themeforest.net/page/item_support_policy)

   [themeforest.net/page/item_support_policy](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[to](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[provide](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[standard](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[support](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[for](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[our](https://themeforest.net/page/item_support_policy)[ ](https://themeforest.net/page/item_support_policy)[items](https://themeforest.net/page/item_support_policy)
