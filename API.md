# API Reference

Complete API documentation for the Dynamic Scroll Menu components.

## Table of Contents
- [ScrollMenu.js](#scrollmenujs)
- [MenuItem.js](#menuitemjs)
- [DataManager.js](#datamanagerjs)
- [DynamicScrollMenuController.js](#dynamicscrollmenucontrollerjs)
- [Utils.js](#utilsjs)

---

## ScrollMenu.js

The main scrolling component that handles touch interactions and menu item positioning.

### Input Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `screenTransform` | Component.ScreenTransform | - | Screen transform component for the menu |
| `menuItems` | SceneObject[] | - | Array of menu item scene objects |
| `scrollSpeed` | float | 1.0 | Scroll sensitivity multiplier (0.5-2.0 recommended) |
| `itemSpacing` | float | 150.0 | Spacing between menu items in pixels |
| `scrollBounds` | vec2 | - | Min (x) and max (y) scroll positions |

### Public API

#### `scrollTo(position)`
Scrolls the menu to a specific position.

**Parameters:**
- `position` (float): Target scroll position

**Example:**
```javascript
scrollMenu.api.scrollTo(-300);
```

#### `scrollToItem(index)`
Scrolls to a specific menu item by its index.

**Parameters:**
- `index` (int): Zero-based index of the item

**Example:**
```javascript
scrollMenu.api.scrollToItem(2); // Scroll to third item
```

#### `getCurrentPosition()`
Gets the current scroll position.

**Returns:** 
- (float): Current scroll position

**Example:**
```javascript
var position = scrollMenu.api.getCurrentPosition();
print("Current position: " + position);
```

### Events

The script automatically handles these touch events:
- `TouchStartEvent`: Initiates dragging
- `TouchMoveEvent`: Updates scroll position during drag
- `TouchEndEvent`: Ends dragging and applies inertia

---

## MenuItem.js

Represents an individual menu item with selection handling and visual feedback.

### Input Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `textComponent` | Component.Text | - | Text component for displaying item label |
| `iconComponent` | Component.Image | - | Optional image component for icon |
| `itemId` | string | - | Unique identifier for the item |
| `itemText` | string | - | Display text for the item |
| `itemIcon` | Asset.Texture | - | Optional texture for the icon |

### Public API

#### `setData(itemData)`
Sets the item's data programmatically.

**Parameters:**
- `itemData` (object): Object containing id, text, and optional icon
  ```javascript
  {
    id: "unique-id",
    text: "Display Text",
    icon: textureAsset // optional
  }
  ```

**Example:**
```javascript
menuItem.api.setData({
    id: "settings",
    text: "Settings",
    icon: settingsIcon
});
```

#### `setOnSelectCallback(callback)`
Sets a callback function to be called when the item is selected.

**Parameters:**
- `callback` (function): Function to call on selection
  - Signature: `function(itemId, itemText)`

**Example:**
```javascript
menuItem.api.setOnSelectCallback(function(id, text) {
    print("Selected: " + text);
});
```

#### `getId()`
Gets the item's unique identifier.

**Returns:**
- (string): Item ID

#### `getText()`
Gets the item's display text.

**Returns:**
- (string): Item text

### Events

- `TouchStartEvent`: Triggers selection and animation

---

## DataManager.js

Manages menu data from local or remote sources.

### Input Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `remoteServiceModule` | Asset.RemoteServiceModule | - | Optional module for remote data |
| `dataUrl` | string | - | URL for fetching remote data |
| `useLocalData` | bool | true | Use local data instead of remote |
| `localDataJson` | string | - | JSON string of menu data |

### Public API

#### `getData()`
Returns all menu data.

**Returns:**
- (array): Array of menu item objects

**Example:**
```javascript
var data = dataManager.api.getData();
print("Total items: " + data.length);
```

#### `setData(data)`
Sets menu data programmatically and triggers data loaded callback.

**Parameters:**
- `data` (array): Array of menu item objects

**Example:**
```javascript
dataManager.api.setData([
    {id: "1", text: "Item 1"},
    {id: "2", text: "Item 2"}
]);
```

#### `loadData()`
Loads data from the configured source (local or remote).

**Example:**
```javascript
dataManager.api.loadData();
```

#### `setOnDataLoaded(callback)`
Sets a callback function to be called when data is loaded.

**Parameters:**
- `callback` (function): Function to call when data loads
  - Signature: `function(menuData)`

**Example:**
```javascript
dataManager.api.setOnDataLoaded(function(data) {
    print("Loaded " + data.length + " items");
});
```

#### `refreshData()`
Reloads data from the source.

**Example:**
```javascript
dataManager.api.refreshData();
```

#### `getItemById(itemId)`
Finds and returns a menu item by its ID.

**Parameters:**
- `itemId` (string): ID to search for

**Returns:**
- (object|null): Item object or null if not found

**Example:**
```javascript
var item = dataManager.api.getItemById("settings");
if (item) {
    print("Found: " + item.text);
}
```

#### `getItemCount()`
Returns the total number of menu items.

**Returns:**
- (int): Number of items

---

## DynamicScrollMenuController.js

Main controller that integrates all components.

### Input Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `scrollMenuObject` | SceneObject | - | Object with ScrollMenu script |
| `dataManagerObject` | SceneObject | - | Object with DataManager script |
| `menuItemPrefab` | SceneObject | - | Prefab for creating menu items |
| `menuContainer` | SceneObject | - | Container for menu items |
| `autoLoadData` | bool | true | Auto-load data on initialization |

### Public API

#### `loadData()`
Triggers data loading via DataManager.

**Example:**
```javascript
controller.api.loadData();
```

#### `refreshData()`
Refreshes menu data from the source.

**Example:**
```javascript
controller.api.refreshData();
```

#### `scrollToItem(index)`
Scrolls to a specific menu item by index.

**Parameters:**
- `index` (int): Zero-based item index

**Example:**
```javascript
controller.api.scrollToItem(0); // Scroll to first item
```

#### `getDataManager()`
Returns reference to the DataManager script.

**Returns:**
- (Component.ScriptComponent): DataManager script

#### `getScrollMenu()`
Returns reference to the ScrollMenu script.

**Returns:**
- (Component.ScriptComponent): ScrollMenu script

---

## Utils.js

Utility functions for common operations.

### Public API

#### `clamp(value, min, max)`
Clamps a value between min and max.

**Parameters:**
- `value` (float): Value to clamp
- `min` (float): Minimum value
- `max` (float): Maximum value

**Returns:**
- (float): Clamped value

#### `lerp(start, end, t)`
Linear interpolation between two values.

**Parameters:**
- `start` (float): Start value
- `end` (float): End value
- `t` (float): Interpolation factor (0-1)

**Returns:**
- (float): Interpolated value

#### `smoothstep(t)`
Smooth interpolation with ease in/out.

**Parameters:**
- `t` (float): Input value (0-1)

**Returns:**
- (float): Smoothed value

#### `map(value, inMin, inMax, outMin, outMax)`
Maps a value from one range to another.

**Parameters:**
- `value` (float): Value to map
- `inMin` (float): Input range minimum
- `inMax` (float): Input range maximum
- `outMin` (float): Output range minimum
- `outMax` (float): Output range maximum

**Returns:**
- (float): Mapped value

#### `distance2D(p1, p2)`
Calculates distance between two 2D points.

**Parameters:**
- `p1` (vec2): First point
- `p2` (vec2): Second point

**Returns:**
- (float): Distance

#### `isInBounds(point, bounds)`
Checks if a point is within bounds.

**Parameters:**
- `point` (vec2): Point to check
- `bounds` (object): Bounds with min and max properties

**Returns:**
- (bool): True if within bounds

#### `formatTime(milliseconds)`
Formats milliseconds to readable time string.

**Parameters:**
- `milliseconds` (int): Time in milliseconds

**Returns:**
- (string): Formatted time (e.g., "1:23")

#### `deepClone(obj)`
Creates a deep copy of an object.

**Parameters:**
- `obj` (object): Object to clone

**Returns:**
- (object): Cloned object

---

## Data Format

Menu data should follow this JSON structure:

```json
[
  {
    "id": "unique-identifier",
    "text": "Display Text",
    "icon": null,
    "description": "Optional description",
    "action": "optional:action",
    "data": {
      // Optional custom data
    }
  }
]
```

### Field Descriptions

- `id` (required): Unique identifier for the item
- `text` (required): Display text shown in the menu
- `icon` (optional): Reference to texture asset or null
- `description` (optional): Additional information about the item
- `action` (optional): Action to perform on selection
- `data` (optional): Custom data for application use

---

## Integration Example

```javascript
// Get references
var controller = scene.find("ControllerObject").getComponent("Component.ScriptComponent");
var dataManager = controller.api.getDataManager();
var scrollMenu = controller.api.getScrollMenu();

// Load custom data
dataManager.api.setData([
    {id: "1", text: "Home"},
    {id: "2", text: "Settings"}
]);

// Handle selection
dataManager.api.setOnDataLoaded(function(data) {
    print("Loaded " + data.length + " items");
    
    // Scroll to first item
    controller.api.scrollToItem(0);
});

// Get current scroll position
var position = scrollMenu.api.getCurrentPosition();
```

---

## Best Practices

1. **Always check for null/undefined** before accessing API methods
2. **Use callbacks** for asynchronous operations
3. **Validate data format** before passing to DataManager
4. **Handle errors gracefully** with try-catch blocks
5. **Test on device** as simulator behavior may differ
6. **Keep item count reasonable** (10-20 items) for best performance

---

## Version History

- **v1.0.0** (2025-12-09): Initial release
  - Core scrolling functionality
  - Data management system
  - Touch interaction handling
  - Dynamic item creation

---

For more information, see the [README.md](README.md) and [SETUP.md](SETUP.md).
