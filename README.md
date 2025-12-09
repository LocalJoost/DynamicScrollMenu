# DynamicScrollMenu

A dynamic data-driven scroll menu for Snap Spectacles, built with Lens Studio. This project provides a flexible and customizable scrolling menu system that can be populated with data from JSON sources.

## Features

- **Touch-based Scrolling**: Smooth scroll interactions with touch gestures
- **Dynamic Data Loading**: Load menu items from JSON data sources
- **Customizable Items**: Support for text, icons, and custom styling
- **Inertia Scrolling**: Natural scrolling physics with momentum
- **Item Selection**: Built-in tap-to-select functionality with visual feedback
- **Data Management**: Centralized data handling with support for local and remote data

## Project Structure

```
DynamicScrollMenu/
├── Public/
│   ├── Scripts/
│   │   ├── ScrollMenu.js              # Main scroll menu component
│   │   ├── MenuItem.js                # Individual menu item component
│   │   ├── DataManager.js             # Data loading and management
│   │   └── DynamicScrollMenuController.js  # Main controller
│   └── Data/
│       └── sample-menu-data.json      # Sample menu data
└── README.md
```

## Components

### 1. ScrollMenu.js
The core scrolling component that handles:
- Touch input events (start, move, end)
- Smooth scrolling with interpolation
- Inertia and momentum physics
- Scroll bounds and constraints
- Menu item positioning

**Input Parameters:**
- `screenTransform`: Component.ScreenTransform - The screen transform component
- `menuItems`: SceneObject[] - Array of menu item scene objects
- `scrollSpeed`: float (default: 1.0) - Scroll sensitivity multiplier
- `itemSpacing`: float (default: 150.0) - Spacing between menu items in pixels
- `scrollBounds`: vec2 - Min and max scroll positions

**Public API:**
- `scrollTo(position)`: Scroll to a specific position
- `scrollToItem(index)`: Scroll to a specific menu item by index
- `getCurrentPosition()`: Get the current scroll position

### 2. MenuItem.js
Represents individual menu items with:
- Text and icon display
- Selection handling
- Visual feedback on tap
- Data binding

**Input Parameters:**
- `textComponent`: Component.Text - Text component for item label
- `iconComponent`: Component.Image - Optional icon component
- `itemId`: string - Unique identifier for the item
- `itemText`: string - Display text
- `itemIcon`: Asset.Texture - Optional icon texture

**Public API:**
- `setData(itemData)`: Set the item's data (id, text, icon)
- `setOnSelectCallback(callback)`: Set callback for item selection
- `getId()`: Get the item's ID
- `getText()`: Get the item's text

### 3. DataManager.js
Manages menu data from various sources:
- Local JSON data parsing
- Remote data loading (with Remote Service Module)
- Data refresh capabilities
- Item lookup by ID

**Input Parameters:**
- `remoteServiceModule`: Asset.RemoteServiceModule - Optional for remote data
- `dataUrl`: string - URL for remote data fetching
- `useLocalData`: bool (default: true) - Use local vs remote data
- `localDataJson`: string - JSON string of menu data

**Public API:**
- `getData()`: Get all menu data
- `setData(data)`: Set menu data programmatically
- `loadData()`: Load data (local or remote)
- `setOnDataLoaded(callback)`: Set callback for data loaded event
- `refreshData()`: Reload data
- `getItemById(itemId)`: Find item by ID
- `getItemCount()`: Get total number of items

### 4. DynamicScrollMenuController.js
Main controller that integrates all components:
- Connects DataManager with ScrollMenu
- Handles dynamic menu item creation
- Manages item selection events
- Provides unified API

**Input Parameters:**
- `scrollMenuObject`: SceneObject - Object with ScrollMenu script
- `dataManagerObject`: SceneObject - Object with DataManager script
- `menuItemPrefab`: SceneObject - Prefab for creating menu items
- `menuContainer`: SceneObject - Container for menu items
- `autoLoadData`: bool (default: true) - Auto-load data on start

**Public API:**
- `loadData()`: Trigger data load
- `refreshData()`: Refresh menu data
- `scrollToItem(index)`: Scroll to item by index
- `getDataManager()`: Get DataManager reference
- `getScrollMenu()`: Get ScrollMenu reference

## Setup in Lens Studio

### Basic Setup

1. **Create the Scene Hierarchy:**
   ```
   Camera
   └── Screen Region
       └── ScrollMenuContainer [Screen Transform]
           ├── DataManagerObject [Script: DataManager.js]
           ├── ScrollMenuObject [Script: ScrollMenu.js]
           ├── ControllerObject [Script: DynamicScrollMenuController.js]
           └── MenuContainer [Screen Transform]
               └── MenuItem1 [Screen Transform]
                   ├── Text [Text Component]
                   └── Icon [Image Component]
   ```

2. **Add Scripts:**
   - Import all scripts from `Public/Scripts/` into your Lens Studio project
   - Attach `DataManager.js` to the DataManagerObject
   - Attach `ScrollMenu.js` to the ScrollMenuObject
   - Attach `DynamicScrollMenuController.js` to the ControllerObject

3. **Configure DataManager:**
   - Set `useLocalData` to true
   - Paste your JSON data into `localDataJson` field, or
   - Configure Remote Service Module for remote data

4. **Configure ScrollMenu:**
   - Assign the ScreenTransform component
   - Set `scrollSpeed` (recommended: 0.5-2.0)
   - Set `itemSpacing` (recommended: 100-200 pixels)
   - Set `scrollBounds` (e.g., x: -1000, y: 100)

5. **Configure Controller:**
   - Assign `scrollMenuObject` reference
   - Assign `dataManagerObject` reference
   - Assign `menuItemPrefab` (your menu item template)
   - Assign `menuContainer` (parent for items)

### Creating Menu Items

Menu items should have:
- A Screen Transform component
- A Text component for the label
- An optional Image component for icons
- The MenuItem.js script attached

### Data Format

Menu data should be a JSON array of objects with this structure:

```json
[
  {
    "id": "unique-id",
    "text": "Display Text",
    "icon": null,
    "description": "Optional description"
  }
]
```

See `Public/Data/sample-menu-data.json` for a complete example.

## Usage Examples

### Example 1: Local Data Menu

```javascript
// In your DataManager script inputs:
useLocalData: true
localDataJson: '[{"id":"1","text":"Item 1"},{"id":"2","text":"Item 2"}]'
```

### Example 2: Scrolling to Specific Item

```javascript
// In another script, get reference to controller
var controller = global.scene.find("ControllerObject").getComponent("Component.ScriptComponent");
controller.api.scrollToItem(3); // Scroll to the 4th item (0-indexed)
```

### Example 3: Handling Item Selection

Modify MenuItem.js or use the controller to handle selections:

```javascript
// In DynamicScrollMenuController.js, update onItemSelected:
function onItemSelected(itemId, itemText) {
    print("User selected: " + itemText);
    // Navigate to detail view
    // Play sound effect
    // Trigger haptic feedback
}
```

### Example 4: Dynamic Data Refresh

```javascript
// Refresh menu data from remote source
var controller = global.scene.find("ControllerObject").getComponent("Component.ScriptComponent");
controller.api.refreshData();
```

## Customization

### Styling
- Modify text colors, fonts, and sizes in the Text components
- Customize item backgrounds using Image components
- Adjust spacing and layout using Screen Transform anchors

### Animations
- Extend MenuItem.js to add custom selection animations
- Add fade-in effects for items as they scroll into view
- Implement parallax scrolling for background elements

### Advanced Features
- Add search/filter functionality in DataManager
- Implement infinite scrolling
- Add swipe-to-delete gestures
- Support for nested/hierarchical menus

## Performance Tips

1. **Optimize Item Count**: Keep visible items to 10-15 for best performance
2. **Object Pooling**: Reuse menu item objects instead of creating/destroying
3. **Texture Optimization**: Use compressed textures for icons
4. **Lazy Loading**: Load item details only when needed
5. **Debounce Updates**: Limit update frequency during rapid scrolling

## Troubleshooting

### Menu doesn't scroll
- Check that ScrollMenu script has valid screenTransform reference
- Verify touch events are not blocked by other UI elements
- Ensure menuItems array is populated

### Items not appearing
- Check that menuContainer has valid parent
- Verify item prefab has correct components
- Check console for data loading errors

### Performance issues
- Reduce number of visible menu items
- Optimize textures and materials
- Disable unnecessary components on items

## Requirements

- Lens Studio 5.0 or higher
- Snap Spectacles device or simulator
- Basic knowledge of JavaScript and Lens Studio

## License

MIT License - feel free to use and modify for your projects

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Support

For questions and support:
- Check the [Lens Studio documentation](https://docs.snap.com/lens-studio)
- Visit the [Snapchat Lens Studio forums](https://support.lensstudio.snapchat.com/)

## Credits

Developed for Snap Spectacles AR experiences.