// @input Component.ScreenTransform screenTransform
// @input SceneObject[] menuItems
// @input float scrollSpeed = 1.0
// @input float itemSpacing = 150.0
// @input vec2 scrollBounds {"hint":"Min and Max scroll positions"}

/**
 * Dynamic Scroll Menu for Snap Spectacles
 * Handles scrolling through menu items with touch gestures
 */

// Initialize variables
var currentScrollPosition = 0;
var targetScrollPosition = 0;
var isDragging = false;
var lastTouchPosition = null;
var velocity = 0;

// Touch event handler
var touchStartEvent = script.createEvent("TouchStartEvent");
touchStartEvent.bind(onTouchStart);

var touchMoveEvent = script.createEvent("TouchMoveEvent");
touchMoveEvent.bind(onTouchMove);

var touchEndEvent = script.createEvent("TouchEndEvent");
touchEndEvent.bind(onTouchEnd);

// Update event for smooth scrolling
var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);

function onTouchStart(eventData) {
    isDragging = true;
    lastTouchPosition = eventData.getTouchPosition();
    velocity = 0;
}

function onTouchMove(eventData) {
    if (!isDragging) return;
    
    var currentTouchPosition = eventData.getTouchPosition();
    if (lastTouchPosition) {
        var delta = currentTouchPosition.y - lastTouchPosition.y;
        targetScrollPosition += delta * script.scrollSpeed * 500;
        
        // Clamp to bounds
        if (script.scrollBounds) {
            targetScrollPosition = Math.max(script.scrollBounds.x, 
                                          Math.min(script.scrollBounds.y, targetScrollPosition));
        }
    }
    lastTouchPosition = currentTouchPosition;
}

function onTouchEnd(eventData) {
    isDragging = false;
    lastTouchPosition = null;
}

function onUpdate(eventData) {
    // Smooth interpolation
    var lerpFactor = 0.1;
    currentScrollPosition += (targetScrollPosition - currentScrollPosition) * lerpFactor;
    
    // Apply inertia if not dragging
    if (!isDragging && Math.abs(velocity) > 0.01) {
        velocity *= 0.95; // Damping
        targetScrollPosition += velocity;
        
        // Clamp to bounds
        if (script.scrollBounds) {
            targetScrollPosition = Math.max(script.scrollBounds.x, 
                                          Math.min(script.scrollBounds.y, targetScrollPosition));
        }
    }
    
    // Update menu item positions
    updateMenuItems();
}

function updateMenuItems() {
    if (!script.menuItems) return;
    
    for (var i = 0; i < script.menuItems.length; i++) {
        var item = script.menuItems[i];
        if (!item) continue;
        
        var itemTransform = item.getComponent("Component.ScreenTransform");
        if (itemTransform) {
            var basePosition = i * script.itemSpacing;
            var position = itemTransform.anchors.getCenter();
            position.y = (basePosition + currentScrollPosition) / 1000.0; // Normalize
            itemTransform.anchors.setCenter(position);
        }
    }
}

// Public functions
script.api.scrollTo = function(position) {
    targetScrollPosition = position;
};

script.api.scrollToItem = function(index) {
    if (index >= 0 && index < script.menuItems.length) {
        targetScrollPosition = -index * script.itemSpacing;
    }
};

script.api.getCurrentPosition = function() {
    return currentScrollPosition;
};
