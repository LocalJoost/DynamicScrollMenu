// @input SceneObject scrollMenuObject
// @input SceneObject dataManagerObject
// @input SceneObject menuItemPrefab {"hint":"Prefab for menu items"}
// @input SceneObject menuContainer {"hint":"Container for dynamically created menu items"}
// @input bool autoLoadData = true

/**
 * Dynamic Scroll Menu Controller
 * Integrates DataManager with ScrollMenu to create a fully dynamic menu system
 */

var scrollMenu = null;
var dataManager = null;
var menuItemScripts = [];

function initialize() {
    // Get references to components
    if (script.scrollMenuObject) {
        scrollMenu = script.scrollMenuObject.getFirstComponent("Component.ScriptComponent");
    }
    
    if (script.dataManagerObject) {
        dataManager = script.dataManagerObject.getFirstComponent("Component.ScriptComponent");
    }
    
    if (!scrollMenu || !dataManager) {
        print("Error: ScrollMenu or DataManager not found!");
        return;
    }
    
    // Set up data loaded callback
    dataManager.api.setOnDataLoaded(onDataLoaded);
    
    // Load data if auto-load is enabled
    if (script.autoLoadData) {
        dataManager.api.loadData();
    }
}

function onDataLoaded(menuData) {
    print("Data loaded: " + menuData.length + " items");
    
    // Clear existing menu items
    clearMenuItems();
    
    // Create menu items dynamically
    createMenuItems(menuData);
}

function clearMenuItems() {
    // Remove old menu items if needed
    menuItemScripts = [];
}

function createMenuItems(menuData) {
    if (!script.menuContainer || !script.menuItemPrefab) {
        print("Error: Menu container or item prefab not set");
        return;
    }
    
    var items = [];
    
    for (var i = 0; i < menuData.length; i++) {
        var itemData = menuData[i];
        
        // In a real Lens Studio implementation, you would instantiate the prefab
        // For now, we'll work with existing objects
        // var menuItem = script.menuItemPrefab.instantiate(script.menuContainer);
        
        // This is a simplified version - actual implementation would require
        // proper prefab instantiation in Lens Studio
        print("Creating menu item: " + itemData.text);
        
        // Store reference (in actual implementation, this would be the instantiated object)
        // items.push(menuItem);
    }
    
    // Update scroll menu with new items
    if (scrollMenu && scrollMenu.api) {
        // scrollMenu.menuItems = items;
        print("Menu items updated");
    }
}

function onItemSelected(itemId, itemText) {
    print("Item selected: " + itemId + " - " + itemText);
    
    // Handle item selection
    // This could trigger navigation, display details, etc.
}

// Public API
script.api.loadData = function() {
    if (dataManager) {
        dataManager.api.loadData();
    }
};

script.api.refreshData = function() {
    if (dataManager) {
        dataManager.api.refreshData();
    }
};

script.api.scrollToItem = function(index) {
    if (scrollMenu && scrollMenu.api) {
        scrollMenu.api.scrollToItem(index);
    }
};

script.api.getDataManager = function() {
    return dataManager;
};

script.api.getScrollMenu = function() {
    return scrollMenu;
};

// Initialize on start
initialize();
