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
        posts: isServer
          ? "posts@http://localhost:3001/node/remoteEntry.js"
          : "posts@http://localhost:3001/web/remoteEntry.js",
        shared: isServer
          ? "shared@http://localhost:3002/node/remoteEntry.js"
          : "shared@http://localhost:3002/web/remoteEntry.js",
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
