let containerMap = {};
let initDefaultScope = false;
let initNgScope = false;
async function initRemote(container, key) {
    // Do we still need to initialize the share scope?
    if (!initDefaultScope) {
        await __webpack_init_sharing__('default');
        initDefaultScope= true;
    }
    if (!initNgScope) {
        await __webpack_init_sharing__('ng@13');
        initNgScope= true;
    }
    if(['thirdButton','secondButton'].includes(key)){
        await container.init(__webpack_share_scopes__['ng@13']);
    }
    // remoteMap[key] = true;
    return container;
  }

 export async function loadRemoteModule(options) {
    let key;
    key = options.remoteName;
    await loadRemoteScriptEntry(options.remoteEntry,options.remoteName);

    return await lookupExposedModule(key, options.exposedModule);
}

async function loadRemoteScriptEntry(remoteEntry, remoteName) {
    return new Promise((resolve, reject) => {
        // Is remoteEntry already loaded?
        if (containerMap[remoteName]) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = remoteEntry;
        script.onerror = reject;
        script.onload = () => {
            const container = window[remoteName];
            initRemote(container, remoteName);
            containerMap[remoteName] = container;
            resolve();
        };
        document.body.appendChild(script);
    });
}

async function lookupExposedModule(key, exposedModule) {
    const container = containerMap[key];
    const factory = await container.get(exposedModule);
    const Module = factory();
    return Module;
}