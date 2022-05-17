# Point of Sale CPS 593 Project

## Purpose

This idea behind this project was to create a simple full-stack application for my Web-Dev class.
The main features it boost is a full fledged MySQL based backend REST API and a frontend built with SvelteKit.
Main theme was a simple utilization of [Bootstrap's](https://getbootstrap.com/docs/5.2/getting-started/introduction/) tool set.

![main-page](https://i.imgur.com/b3oBn0o.png)

List of tools used for project:

-   [Svelte](https://svelte.dev/) ([SvelteKit](https://kit.svelte.dev/))
-   [Bootstrap](https://getbootstrap.com/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Express](https://expressjs.com/)
-   [Bcrypt](https://www.npmjs.com/package/bcrypt)
-   [JWT](https://jwt.io/)
-   [MySQL](https://www.mysql.com/)

## Functionality

This application if it were to be fully fleshed out would connect companies with consumers in order for the purchase of goods. For the purposes of this project I have implemented most of the necessary information for the backend of the project for this functionality but the frontend only captures the user's experience with some predefined items.

To utilize the page a user would either register or login which would push them along into the shop page where they could click to add items to there cart. Once they have selected all of the items they desire they can click the cart button that appeared on the right of the navbar once they initially logged in. This page has access to the same cart the user setup and from here the user can remove whatever items they no longer want from the cart.

On a side note the user remains logged in upon refresh of the site because I made sure to grab a JWT of the user from the backend and store it in localstorage. This JWT is accessed upon the loading of each page if the session.user is not set allowing for a seemless experience from the User's POV.

### Unimplemented

Ideally in a fully fleshed out product there would be profiles for each user and the ability to edit them. Along with OAuth for easier registering.

When the user is done setting up there cart the order button does nothing. If I were to work on this project more this button would lead to a [Stripe](https://stripe.com/) based payout page.

This product would also facillitate the interaction between companies and consumers so having a seperate register for companies and giving them tools to add items they are selling and stuff associated with that would also be used.

Reviews are also to be implemented but that is easy if a profile page for each item were to be created.

## Bugs

Due to my lack of experience with SvelteKit and more generally Svelte, I have not gotten the reactivity to work exactly as I would like and occasionally when the user logs in and out and navigates between pages the navbar does not always update to the proper setup. This can mostly be fixed by just refreshing the page.

## ERD and Explanation

![erd](https://i.imgur.com/qYGo6RR.png)

#### User

Stores all of the data related to the one interacting with the webpage. Notable change from my original diagram is that I no longer save location data because that would be handle by Stripe if it were implemented.

#### Item

Represents an Item that can be bought, sold, and selected on the webpage

#### Company

Represents the oen with creates the Items that are then sold to the user.

#### Review

If it were implemented, a user would fill out a form on a certain item's profile page and the data would be stored here

#### Order

Keeps track of who orders what from the webpage. Alot of this data is up for change because stripe would probably hold alot of it.

## How to Run Locally

For running this project on your local machine you must make sure to have mysql downloaded and installed. Along with knowing the user and password you created in this process.

Depends on:

```bash
nodejs      (>v8.1.2)
npm         (>v16.13.2)
mysql       (>v8.0)
```

To get project:

```bash
git clone https://github.com/AndrewMcDonald-Dev/webDevProj.git
cd webDevProj
```

#### For development:

```bash
cd server
npm i
npm run dev
```

```bash
cd server
npm run compile
```

```bash
cd client
npm i
npm run dev
```

#### For production

```bash
cd server
npm i
npm run compile #close after first compile
npm start
```

```bash
cd client
npm i
npm run build
```

#### Database

The following are environment variables that must be fileld and entered into a new file `server/.env`.

```
SALT_ROUNDS
JWT_SECRET
DB_HOST
DB_USER
DB_PASSWORD
DB_DATABASE
```

## Pictures

### Login and Register

![login](https://i.imgur.com/l6oY8GL.png)
Notice Navbar changing
![loggedIn](https://i.imgur.com/O0mpiUx.png)
![register](https://i.imgur.com/oHhVAhd.png)
![registered](https://i.imgur.com/BiitouA.png)

### Shop interface

When buttons are clicked
![added](https://i.imgur.com/to1TSj3.png)

### Cart interface

Shows what I clicked in shop interface
![carted](https://i.imgur.com/uhfhg31.png)
