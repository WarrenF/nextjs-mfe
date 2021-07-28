# nextjs-mfe

This respository explores a monorepo NextJS single page application micro-frontend setup using module federation and typescript.

The App Shell is a NextJs application, and the MFEs are just React setups.

It is possible for the MFEs and App Shell to communicate with each other through an event emitter which is placed on the window object. You can see this in action from links inside of the Posts component.

To setup, run the following in the specified order to create a production build which is served from http://localhost:3000

`yarn bootstrap`
`yarn build:mfes`
`yarn start:mfes`
`yarn build:shell`
`yarn start:shell`

Ideally, the remoteEntry js files would be uploaded to an s3 bucket and the App Shell would load them from there.