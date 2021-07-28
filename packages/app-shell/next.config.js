const packageJsonDeps = require("./package.json").dependencies
const { NodeModuleFederation } = require("@telenko/node-mf")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const path = require("path")

module.exports = {
  webpack5: true,
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options
    const mfConf = {
      remotes: {
        postsLib: isServer
          ? "postsLib@http://localhost:3001/node/remoteEntry.js"
          : "postsLib@http://localhost:3001/web/remoteEntry.js"
          // : {
          //   external: `external new Promise((r, j) => {
          //   window['remoteLib'].init({
          //     react: {
          //       "${packageJsonDeps.react}": {
          //         get: () => Promise.resolve().then(() => () => globalThis.React),
          //       }
          //     }
          //   });
          //   r({
          //     get: (request) => window['remoteLib'].get(request),
          //     init: (args) => {}
          //   });
          // })`,
          // },
      },
      shared: {
        react: {
          eager: true,
          requiredVersion: packageJsonDeps["react"],
          singleton: true,
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJsonDeps["react-dom"],
          singleton: true,
        },
      },
    }
    return {
      ...config,
      plugins: [
        ...config.plugins,
        new (isServer ? NodeModuleFederation : ModuleFederationPlugin)(mfConf),
      ],
      experiments: { topLevelAwait: true },
    }
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  },
}
