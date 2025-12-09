// @input Asset.RemoteServiceModule remoteServiceModule {"hint":"Optional for loading remote data"}
// @input string dataUrl {"hint":"URL to fetch menu data from"}
// @input bool useLocalData = true
// @input string localDataJson {"hint":"JSON string of menu data"}

/**
 * Data Manager for Dynamic Menu
 * Handles loading and managing menu data from various sources
 */

var menuData = [];
var onDataLoadedCallback = null;
var isLoading = false;

// Initialize with local data if available
function initialize() {
    if (script.useLocalData && script.localDataJson) {
        try {
            menuData = JSON.parse(script.localDataJson);
            notifyDataLoaded();
        } catch (e) {
            print("Error parsing local data: " + e);
        }
    }
}

// Load data from remote service
function loadRemoteData() {
    if (isLoading || !script.remoteServiceModule) return;
    
    isLoading = true;
    print("Loading remote data from: " + script.dataUrl);
    
    // Note: This is a placeholder for remote service integration
    // Actual implementation would depend on Lens Studio's remote service API
    
    // Simulated async load
    var delayedEvent = script.createEvent("DelayedCallbackEvent");
    delayedEvent.bind(function() {
        // For demo purposes, use sample data
        menuData = getSampleData();
        isLoading = false;
        notifyDataLoaded();
    });
    delayedEvent.reset(0.5);
}

function getSampleData() {
    return [
        {id: "item1", text: "Menu Item 1", icon: null},
        {id: "item2", text: "Menu Item 2", icon: null},
        {id: "item3", text: "Menu Item 3", icon: null},
        {id: "item4", text: "Menu Item 4", icon: null},
        {id: "item5", text: "Menu Item 5", icon: null},
        {id: "item6", text: "Menu Item 6", icon: null},
        {id: "item7", text: "Menu Item 7", icon: null},
        {id: "item8", text: "Menu Item 8", icon: null}
    ];
}

function notifyDataLoaded() {
    if (onDataLoadedCallback) {
        onDataLoadedCallback(menuData);
    }
}

// Public API
script.api.getData = function() {
    return menuData;
};

script.api.setData = function(data) {
    menuData = data;
    notifyDataLoaded();
};

script.api.loadData = function() {
    if (script.useLocalData) {
        initialize();
    } else {
        loadRemoteData();
    }
};

script.api.setOnDataLoaded = function(callback) {
    onDataLoadedCallback = callback;
};

script.api.refreshData = function() {
    if (!script.useLocalData) {
        loadRemoteData();
    } else {
        initialize();
    }
};

script.api.getItemById = function(itemId) {
    for (var i = 0; i < menuData.length; i++) {
        if (menuData[i].id === itemId) {
            return menuData[i];
        }
    }
    return null;
};

script.api.getItemCount = function() {
    return menuData.length;
};

// Auto-initialize on start
initialize();
