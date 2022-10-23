const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const packageDeps = require('./package.json');
const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  resolve: {
    fallback: {
      "path": false,
      "fs": false,
    }
  },
  output: {
    uniqueName: "shell",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },


  plugins: [
    new ModuleFederationPlugin({


      // For remotes (please adjust)
      // name: "shell",
      // filename: "remoteEntry.js",
      // exposes: {
      //     './Component': './/src/app/app.component.ts',
      // },        

      // For hosts (please adjust)
      // remotes: {
      //     "mfe1": "firstButton@http://localhost:4300/remoteEntry.js",
      //     "mfe2": {
      //       external:"secondButton@http://localhost:4400/remoteEntry.js",
      //       shareScope:'ng@13'
      //     },
      //     "mfe3": {
      //       external:"thirdButton@http://localhost:4500/remoteEntry.js",
      //       shareScope:'ng@13'
      //     },
      // },

      shared: {
        "@angular-architects/module-federation": { singleton: true, strictVersion: false, eager: true, requiredVersion: packageDeps.dependencies["@angular-architects/module-federation"] },
        "@angular/animations": { singleton: false, strictVersion: true, eager: true, requiredVersion: packageDeps.dependencies["@angular/animations"] },
        "@angular/common": { singleton: true, strictVersion: true, eager: true, requiredVersion: packageDeps.dependencies["@angular/common"] },
        "@angular/compiler": { singleton: true, strictVersion: true, eager: true, requiredVersion: packageDeps.dependencies["@angular/compiler"] },
        "@angular/material/core": { singleton: true, strictVersion: true, eager: true, requiredVersion: packageDeps.dependencies["@angular/material"] },
        "@angular/material": { singleton: true, strictVersion: true, eager: true, requiredVersion: packageDeps.dependencies["@angular/material"] },
        "@angular/core": { singleton: true, strictVersion: true, eager: true, requiredVersion: packageDeps.dependencies["@angular/core"] },
        "rxjs": { singleton: true, strictVersion: false, eager: true, requiredVersion: packageDeps.dependencies["rxjs"] },
        "rxjs/operators": { singleton: true, strictVersion: false, eager: true, requiredVersion: packageDeps.dependencies["rxjs"] },
        "tslib": { singleton: false, strictVersion: true, eager: true, requiredVersion: packageDeps.dependencies["tslib"] },
        "zone.js": { singleton: false, strictVersion: true, eager: true,  requiredVersion: packageDeps.dependencies["zone.js"] },
        "@angular/platform-browser": { singleton: true, strictVersion: true, eager: true,  requiredVersion: packageDeps.dependencies["@angular/platform-browser"] },
        "@angular/platform-browser-dynamic": { singleton: true, strictVersion: true,  eager: true, requiredVersion: packageDeps.dependencies["@angular/platform-browser-dynamic"] },
        
      }

    }),

  ],
};
