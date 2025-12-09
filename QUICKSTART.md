# Quick Start Guide

Get up and running with Dynamic Scroll Menu in 5 minutes!

## 🚀 Quick Setup

### Step 1: Import Scripts (1 minute)
1. Open Lens Studio
2. Create a new project or open existing one
3. In Resources Panel, create folder "Scripts"
4. Drag all `.js` files from `Public/Scripts/` into your Scripts folder

### Step 2: Create Basic Scene (2 minutes)
1. **Add Screen Image** (rename to "MenuContainer")
   - Select Camera → Add Object → Screen Image
   - Set to Stretch mode

2. **Add Three Empty Objects** under MenuContainer:
   - "DataManager" - Add Script → DataManager.js
   - "ScrollMenu" - Add Script → ScrollMenu.js  
   - "Controller" - Add Script → DynamicScrollMenuController.js

3. **Create Sample Menu Item**
   - Add Screen Image under MenuContainer (rename "MenuItem")
   - Add Text component to MenuItem
   - Set width: 700, height: 100

### Step 3: Configure Scripts (1 minute)

**DataManager:**
```
✓ useLocalData: true
✓ localDataJson: [{"id":"1","text":"Item 1"},{"id":"2","text":"Item 2"}]
```

**ScrollMenu:**
```
✓ screenTransform: [Drag MenuContainer's ScreenTransform]
✓ scrollSpeed: 1.0
✓ itemSpacing: 120
```

**Controller:**
```
✓ scrollMenuObject: [Drag ScrollMenu object]
✓ dataManagerObject: [Drag DataManager object]
✓ menuContainer: [Drag MenuContainer object]
✓ autoLoadData: true
```

### Step 4: Test (1 minute)
1. Click Preview
2. Try dragging up/down to scroll
3. Check Logger for any errors

## ✅ Verification Checklist

- [ ] All scripts imported
- [ ] Scene hierarchy created
- [ ] Scripts configured with references
- [ ] Preview shows menu
- [ ] Scrolling works
- [ ] No console errors

## 🎯 Next Steps

### Basic Customization
1. **Add More Items**: Update localDataJson with more menu items
2. **Style Items**: Change colors, fonts, sizes in MenuItem
3. **Adjust Feel**: Tweak scrollSpeed and itemSpacing

### Add Sample Data
Replace localDataJson with the sample data:

```json
[
  {"id":"1","text":"Explore AR Filters"},
  {"id":"2","text":"My Collection"},
  {"id":"3","text":"Trending Now"},
  {"id":"4","text":"Face Effects"},
  {"id":"5","text":"World Lenses"}
]
```

### Handle Selection
Add to Controller script:
```javascript
function onItemSelected(itemId, itemText) {
    print("Selected: " + itemText);
    // Your custom action here
}
```

## 📚 Learn More

- **Full Setup**: See [SETUP.md](SETUP.md)
- **API Reference**: See [API.md](API.md)
- **Examples**: Check `ExampleIntegration.js`

## 🐛 Troubleshooting

**Menu doesn't scroll?**
- Check screenTransform is assigned
- Verify scrollBounds are set (e.g., x:-1000, y:100)

**Items not visible?**
- Check menuContainer has correct parent
- Verify item dimensions and positions

**Console errors?**
- Check all script references are assigned
- Verify JSON data is valid

## 💡 Tips

- Start with 3-5 items for testing
- Keep scrollSpeed between 0.5-2.0
- Set itemSpacing = item height + margin
- Use Preview for quick testing
- Test on device for final validation

## 🎨 Visual Examples

### Basic Menu Structure
```
Camera
└── MenuContainer [Screen Image]
    ├── DataManager [DataManager.js]
    ├── ScrollMenu [ScrollMenu.js]
    ├── Controller [DynamicScrollMenuController.js]
    └── MenuItem [Screen Image + Text]
```

### Typical Configuration
```
ScrollSpeed: 1.0
ItemSpacing: 120px
Item Size: 700x100px
Bounds: -1000 to 100
```

## 🚦 Status Indicators

During setup, check Logger for these messages:
- ✅ "Data loaded: X items" - Data loaded successfully
- ✅ "Creating menu item: ..." - Items being created
- ❌ "Error: ..." - Check configuration

---

**Ready to build?** Open Lens Studio and follow the steps above!

For detailed instructions, see [SETUP.md](SETUP.md).
