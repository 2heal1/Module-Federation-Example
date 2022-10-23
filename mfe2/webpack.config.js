const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;
const packageDeps = require('./package.json');
const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "secondButton",
    publicPath: "auto",
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "secondButton",
      filename: "remoteEntry.js",
      exposes: {
        // For microfrontends
        './second-button': './src/bootstrap-exported.ts'
      },
        // For remotes (please adjust)
        // name: "mfe2",
        // filename: "remoteEntry.js",
        // exposes: {
        //     './Component': './/src/app/app.component.ts',
        // },        
        
        // For hosts (please adjust)
        // remotes: {
        //     "mfe1": "http://localhost:3000/remoteEntry.js",

      shareScope:'ng@13',
      // },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, shareScope: 'ng@13', requiredVersion: packageDeps.dependencies["@angular/core"] },
          "@angular/common": { singleton: true, strictVersion: true, shareScope: 'ng@13', requiredVersion: packageDeps.dependencies["@angular/common"] },
          "@angular/common/http": { singleton: true, strictVersion: true, shareScope: 'ng@13', requiredVersion: packageDeps.dependencies["@angular/common/http"] },
          "@angular/router": { singleton: true, strictVersion: true, shareScope: 'ng@13', requiredVersion: packageDeps.dependencies["@angular/router"] },
          "tslib": { singleton: false, strictVersion: true, requiredVersion: packageDeps.dependencies["tslib"] },
          "@angular/platform-browser": { singleton: true, strictVersion: true, shareScope: 'ng@13',  requiredVersion: packageDeps.dependencies["@angular/platform-browser"] },
          "@angular/platform-browser-dynamic": { singleton: true, strictVersion: true, shareScope: 'ng@13', requiredVersion: packageDeps.dependencies["@angular/platform-browser-dynamic"] },
          "zone.js": { singleton: false, strictVersion: true, requiredVersion: packageDeps.dependencies["zone.js"] },
          "rxjs": { singleton: false, strictVersion: true, requiredVersion: packageDeps.dependencies["rxjs"] },
          "rxjs/operators": { singleton: false, strictVersion: true, requiredVersion: packageDeps.dependencies["rxjs"] },
          "@angular/material": { singleton: false, strictVersion: true, shareScope: 'ng@13', requiredVersion: packageDeps.dependencies["@angular/material"] },
          "@angular/material/core": { singleton: false, strictVersion: true, shareScope: 'ng@13', requiredVersion: packageDeps.dependencies["@angular/material"] },
  

          ...sharedMappings.getDescriptors()
        })
        
    }),
    sharedMappings.getPlugin()
  ],
};
