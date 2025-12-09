# Dynamic Scroll Menu - Setup Guide

This guide will walk you through setting up the Dynamic Scroll Menu in your Lens Studio project.

## Prerequisites

- Lens Studio 5.0 or higher installed
- Basic familiarity with Lens Studio interface
- Understanding of Screen Transform and UI components

## Step-by-Step Setup

### Step 1: Import Scripts

1. Open your Lens Studio project
2. In the Resources Panel, create a new folder called "Scripts"
3. Import all JavaScript files from `Public/Scripts/`:
   - ScrollMenu.js
   - MenuItem.js
   - DataManager.js
   - DynamicScrollMenuController.js
   - Utils.js

### Step 2: Create Scene Hierarchy

1. **Create Screen Region:**
   - In the Objects Panel, select the Camera
   - Add Object → Screen Image (rename to "ScrollMenuContainer")
   - Set Stretch Mode to "Stretch"

2. **Create Data Manager Object:**
   - Add Object → Empty (rename to "DataManagerObject")
   - Make it a child of ScrollMenuContainer
   - Add Component → Script
   - Select DataManager.js

3. **Create Scroll Menu Object:**
   - Add Object → Empty (rename to "ScrollMenuObject")
   - Make it a child of ScrollMenuContainer
   - Add Component → Script
   - Select ScrollMenu.js

4. **Create Controller Object:**
   - Add Object → Empty (rename to "ControllerObject")
   - Make it a child of ScrollMenuContainer
   - Add Component → Script
   - Select DynamicScrollMenuController.js

5. **Create Menu Container:**
   - Add Object → Screen Image (rename to "MenuContainer")
   - Make it a child of ScrollMenuContainer
   - Remove the Image component (we just need the Screen Transform)

### Step 3: Create Menu Item Prefab

1. **Create Menu Item:**
   - Add Object → Screen Image (rename to "MenuItemPrefab")
   - Make it a child of MenuContainer (temporarily)
   - Set width: 700, height: 100
   - Set anchors to center

2. **Add Text Component:**
   - Add Object → Text (rename to "ItemText")
   - Make it a child of MenuItemPrefab
   - Set Stretch Mode to "Stretch"
   - Configure text properties (font, size, color)
   - Set alignment to Left/Center

3. **Add Icon Component (Optional):**
   - Add Object → Screen Image (rename to "ItemIcon")
   - Make it a child of MenuItemPrefab
   - Set width/height: 64
   - Position to left side of item

4. **Add MenuItem Script:**
   - Select MenuItemPrefab
   - Add Component → Script
   - Select MenuItem.js
   - Assign textComponent → ItemText
   - Assign iconComponent → ItemIcon (if using icons)

### Step 4: Configure DataManager

1. Select DataManagerObject
2. In the Inspector Panel, configure the script:
   - **useLocalData**: Check this box for local data
   - **localDataJson**: Paste your JSON data or use sample data:
     ```json
     [{"id":"1","text":"Item 1"},{"id":"2","text":"Item 2"},{"id":"3","text":"Item 3"}]
     ```
   - For remote data: Configure remoteServiceModule and dataUrl

### Step 5: Configure ScrollMenu

1. Select ScrollMenuObject
2. Configure the script:
   - **screenTransform**: Drag MenuContainer's Screen Transform
   - **menuItems**: Add menu items (initially empty, will be populated dynamically)
   - **scrollSpeed**: 1.0 (adjust to preference)
   - **itemSpacing**: 120.0 (adjust based on item height)
   - **scrollBounds**: Set min (-1000) and max (100)

### Step 6: Configure Controller

1. Select ControllerObject
2. Configure the script:
   - **scrollMenuObject**: Drag ScrollMenuObject
   - **dataManagerObject**: Drag DataManagerObject
   - **menuItemPrefab**: Drag MenuItemPrefab
   - **menuContainer**: Drag MenuContainer
   - **autoLoadData**: Check this box

### Step 7: Test in Preview

1. Click the Preview button in Lens Studio
2. Test touch interactions:
   - Drag to scroll through menu
   - Tap items to select them
3. Check the Logger panel for debug messages

## Configuration Tips

### Adjusting Scroll Feel

- **scrollSpeed**: Higher = more sensitive (0.5 - 2.0 recommended)
- **itemSpacing**: Should be slightly larger than item height
- **scrollBounds**: Adjust based on total items

### Styling Menu Items

1. **Background:**
   - Add color/texture to MenuItemPrefab's Image component
   - Use rounded corners via material settings

2. **Text:**
   - Adjust font, size, color in Text component
   - Use font size 24-36 for readability

3. **Selection Feedback:**
   - Modify animateSelection() in MenuItem.js
   - Add color changes, scale effects, or particles

### Managing Data

#### Local Data
```json
[
  {
    "id": "unique-id",
    "text": "Display Text",
    "description": "Optional details"
  }
]
```

#### Remote Data
1. Set up Remote Service Module in Lens Studio
2. Configure API endpoint
3. Set useLocalData to false
4. Assign remoteServiceModule and dataUrl

## Common Issues

### Items Not Showing
- Verify MenuContainer has correct parent
- Check that menuItems array is populated
- Ensure item prefab has proper dimensions

### Scroll Not Working
- Check screenTransform assignment
- Verify scrollBounds are set correctly
- Ensure touch events aren't blocked

### Performance Issues
- Reduce number of visible items
- Optimize textures
- Use object pooling for many items

## Advanced Customization

### Adding Icons
1. Import icon textures to Resources
2. Assign to itemIcon in MenuItem script
3. Update data to include icon references

### Infinite Scroll
Modify ScrollMenu.js to loop items:
```javascript
// In updateMenuItems(), wrap positions
position.y = position.y % maxHeight;
```

### Search Functionality
Add to DataManager.js:
```javascript
script.api.filterItems = function(searchTerm) {
    return menuData.filter(item => 
        item.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
};
```

## Next Steps

- Customize visual design
- Add more menu item types
- Implement navigation between views
- Add sound effects and haptic feedback
- Test on actual Snap Spectacles device

## Resources

- [Lens Studio Documentation](https://docs.snap.com/lens-studio)
- [Snap Spectacles Developer Guide](https://docs.snap.com/spectacles)
- [JavaScript API Reference](https://docs.snap.com/lens-studio/references/scripting-api)

## Support

For issues or questions, consult the Lens Studio community forums or documentation.
