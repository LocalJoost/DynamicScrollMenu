/**
 * Example Integration
 * 
 * This file demonstrates how to integrate the Dynamic Scroll Menu
 * into your own Lens Studio project with custom behavior.
 */

// @input SceneObject controllerObject

var controller = null;
var currentSelectedItem = null;

// Initialize on start
var initEvent = script.createEvent("SceneObjectEvent");
initEvent.bind(function() {
    initialize();
});

function initialize() {
    // Get controller reference
    if (script.controllerObject) {
        controller = script.controllerObject.getFirstComponent("Component.ScriptComponent");
    }
    
    if (!controller) {
        print("Error: Controller not found!");
        return;
    }
    
    // Set up custom data
    setupCustomData();
    
    // Set up item selection handler
    setupSelectionHandler();
}

function setupCustomData() {
    // Example: Load custom data programmatically
    var customData = [
        {
            id: "home",
            text: "Home",
            description: "Go to home screen",
            action: "navigate:home"
        },
        {
            id: "camera",
            text: "Camera",
            description: "Open camera",
            action: "open:camera"
        },
        {
            id: "gallery",
            text: "Gallery",
            description: "View photos",
            action: "open:gallery"
        },
        {
            id: "settings",
            text: "Settings",
            description: "Adjust settings",
            action: "navigate:settings"
        }
    ];
    
    // Set data through data manager
    var dataManager = controller.api.getDataManager();
    if (dataManager) {
        dataManager.api.setData(customData);
    }
}

function setupSelectionHandler() {
    // Example: Handle item selection
    // In a real implementation, you would hook into the MenuItem callbacks
    
    // For demonstration, we'll simulate handling
    print("Selection handler ready");
}

// Example: Handle menu item selection
function onMenuItemSelected(itemId, itemText) {
    print("Selected: " + itemId + " - " + itemText);
    currentSelectedItem = itemId;
    
    // Get full item data
    var dataManager = controller.api.getDataManager();
    var itemData = dataManager.api.getItemById(itemId);
    
    if (itemData && itemData.action) {
        handleAction(itemData.action);
    }
}

// Example: Handle different actions
function handleAction(action) {
    var parts = action.split(":");
    var actionType = parts[0];
    var actionTarget = parts[1];
    
    switch(actionType) {
        case "navigate":
            navigateTo(actionTarget);
            break;
        case "open":
            openFeature(actionTarget);
            break;
        case "toggle":
            toggleFeature(actionTarget);
            break;
        default:
            print("Unknown action: " + action);
    }
}

function navigateTo(target) {
    print("Navigating to: " + target);
    // Implement navigation logic
    // - Hide current menu
    // - Show target view
    // - Update state
}

function openFeature(feature) {
    print("Opening feature: " + feature);
    // Implement feature opening logic
    // - Trigger camera
    // - Open gallery
    // - Start recording, etc.
}

function toggleFeature(feature) {
    print("Toggling feature: " + feature);
    // Implement toggle logic
    // - Enable/disable effects
    // - Toggle sound
    // - Switch modes, etc.
}

// Example: Programmatic scrolling
function scrollToHome() {
    if (controller) {
        controller.api.scrollToItem(0);
    }
}

// Example: Refresh data from server
function refreshMenuData() {
    if (controller) {
        controller.api.refreshData();
    }
}

// Example: Search/filter menu items
function filterMenu(searchTerm) {
    var dataManager = controller.api.getDataManager();
    var allData = dataManager.api.getData();
    
    var filteredData = allData.filter(function(item) {
        return item.text.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    dataManager.api.setData(filteredData);
}

// Export public API
script.api.onMenuItemSelected = onMenuItemSelected;
script.api.scrollToHome = scrollToHome;
script.api.refreshMenuData = refreshMenuData;
script.api.filterMenu = filterMenu;
