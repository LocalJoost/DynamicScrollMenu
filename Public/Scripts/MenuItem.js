// @input Component.Text textComponent
// @input Component.Image iconComponent {"hint":"Optional icon for the menu item"}
// @input string itemId
// @input string itemText
// @input Asset.Texture itemIcon {"hint":"Optional"}

/**
 * Menu Item Component
 * Represents a single item in the scroll menu
 */

var isInitialized = false;
var onSelectCallback = null;

// Initialize the menu item
function initialize() {
    if (isInitialized) return;
    
    // Set text if available
    if (script.textComponent && script.itemText) {
        script.textComponent.text = script.itemText;
    }
    
    // Set icon if available
    if (script.iconComponent && script.itemIcon) {
        script.iconComponent.mainPass.baseTex = script.itemIcon;
    }
    
    isInitialized = true;
}

// Touch event for selection
var touchStartEvent = script.createEvent("TouchStartEvent");
touchStartEvent.bind(function(eventData) {
    if (onSelectCallback) {
        onSelectCallback(script.itemId, script.itemText);
    }
    
    // Visual feedback
    animateSelection();
});

function animateSelection() {
    // Simple scale animation for feedback
    var sceneObject = script.getSceneObject();
    var transform = sceneObject.getTransform();
    var originalScale = transform.getLocalScale();
    
    // Scale down
    transform.setLocalScale(originalScale.uniformScale(0.9));
    
    // Scale back up after delay
    var delayedEvent = script.createEvent("DelayedCallbackEvent");
    delayedEvent.bind(function() {
        transform.setLocalScale(originalScale);
    });
    delayedEvent.reset(0.1);
}

// Public API
script.api.setData = function(itemData) {
    if (itemData.id) script.itemId = itemData.id;
    if (itemData.text) script.itemText = itemData.text;
    if (itemData.icon) script.itemIcon = itemData.icon;
    
    initialize();
};

script.api.setOnSelectCallback = function(callback) {
    onSelectCallback = callback;
};

script.api.getId = function() {
    return script.itemId;
};

script.api.getText = function() {
    return script.itemText;
};

// Initialize on start
initialize();
