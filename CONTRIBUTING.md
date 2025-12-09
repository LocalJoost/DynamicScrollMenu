# Contributing to Dynamic Scroll Menu

Thank you for your interest in contributing to the Dynamic Scroll Menu project! This document provides guidelines and information for contributors.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Submitting Changes](#submitting-changes)

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for everyone. Please be respectful and constructive in all interactions.

### Expected Behavior
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Be collaborative and constructive
- Focus on what is best for the community

### Unacceptable Behavior
- Harassment, discrimination, or offensive comments
- Trolling or insulting remarks
- Publishing others' private information
- Other unethical or unprofessional conduct

## Getting Started

### Prerequisites
- Lens Studio 5.0 or higher
- Basic knowledge of JavaScript
- Understanding of Lens Studio concepts (Scene Objects, Components, Scripts)
- GitHub account for submitting changes

### Initial Setup
1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your changes
4. Make your changes
5. Test thoroughly in Lens Studio

## Development Setup

### Environment
- Use Lens Studio's built-in script editor or your preferred code editor
- Keep scripts in the `Public/Scripts/` directory
- Store sample data in `Public/Data/`
- Document changes in appropriate markdown files

### Project Structure
```
DynamicScrollMenu/
├── Public/
│   ├── Scripts/          # JavaScript components
│   └── Data/             # Sample data files
├── README.md             # Main documentation
├── SETUP.md              # Setup instructions
├── API.md                # API reference
└── CONTRIBUTING.md       # This file
```

## How to Contribute

### Types of Contributions

#### 1. Bug Reports
- Use GitHub Issues
- Include clear description of the bug
- Provide steps to reproduce
- Include Lens Studio version and device info
- Add screenshots or videos if possible

**Bug Report Template:**
```markdown
**Description:**
Brief description of the bug

**Steps to Reproduce:**
1. Step one
2. Step two
3. ...

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- Lens Studio version:
- Device:
- OS:

**Additional Context:**
Any other relevant information
```

#### 2. Feature Requests
- Use GitHub Issues with "enhancement" label
- Explain the use case
- Describe desired behavior
- Consider implementation challenges
- Be open to discussion

**Feature Request Template:**
```markdown
**Feature Description:**
Clear description of the feature

**Use Case:**
Why is this feature needed?

**Proposed Solution:**
How might this be implemented?

**Alternatives Considered:**
Other approaches that could work

**Additional Context:**
Mockups, examples, or references
```

#### 3. Code Contributions
- Bug fixes
- New features
- Performance improvements
- Documentation updates
- Examples and tutorials

#### 4. Documentation
- Fix typos or unclear explanations
- Add examples
- Improve API documentation
- Write tutorials
- Translate documentation

## Coding Standards

### JavaScript Style Guide

#### Naming Conventions
```javascript
// Variables: camelCase
var menuItems = [];
var currentPosition = 0;

// Functions: camelCase
function updateMenuItems() { }
function onItemSelected() { }

// Constants: UPPER_CASE (if using)
var MAX_ITEMS = 100;
var DEFAULT_SPEED = 1.0;

// Private functions: underscore prefix (optional)
function _internalHelper() { }
```

#### Code Structure
```javascript
// 1. Input parameters (Lens Studio @input declarations)
// @input Component.Text textComponent
// @input float scrollSpeed = 1.0

// 2. Module-level variables
var currentState = null;
var isInitialized = false;

// 3. Event handlers
var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);

// 4. Function definitions
function initialize() {
    // Initialization code
}

function onUpdate(eventData) {
    // Update logic
}

// 5. Public API
script.api.functionName = function() {
    // Public function
};

// 6. Initialization call
initialize();
```

#### Comments
```javascript
// Single-line comments for brief explanations

/**
 * Multi-line comments for functions and complex logic
 * 
 * @param {type} paramName - Description
 * @returns {type} Description
 */
function documentedFunction(paramName) {
    // Implementation
}
```

#### Error Handling
```javascript
// Always validate inputs
function processData(data) {
    if (!data) {
        print("Error: Data is null or undefined");
        return;
    }
    
    // Process data
}

// Use try-catch for parsing and external operations
try {
    var data = JSON.parse(jsonString);
} catch (e) {
    print("Error parsing JSON: " + e);
}
```

### Best Practices

#### 1. Performance
- Minimize operations in update loops
- Cache references to frequently used objects
- Avoid creating objects in update functions
- Use object pooling for dynamic items

```javascript
// Bad: Creates new object every frame
function onUpdate() {
    var position = new vec3(x, y, z);
}

// Good: Reuse object
var position = vec3.zero();
function onUpdate() {
    position.x = x;
    position.y = y;
    position.z = z;
}
```

#### 2. Null Safety
```javascript
// Always check for null/undefined
if (script.component && script.component.enabled) {
    // Use component
}

// Use optional chaining pattern
var value = obj && obj.property && obj.property.value;
```

#### 3. Modularity
- Keep functions focused and single-purpose
- Separate concerns (data, UI, logic)
- Use the script.api for public interfaces
- Minimize global state

#### 4. Lens Studio Specifics
```javascript
// Use Lens Studio events properly
var event = script.createEvent("UpdateEvent");
event.bind(callback);

// Access components correctly
var transform = sceneObject.getComponent("Component.Transform");

// Use script inputs for configuration
// @input float speed = 1.0 {"hint":"Movement speed"}
```

## Testing Guidelines

### Manual Testing Checklist

Before submitting changes, test:

- [ ] Scripts load without errors
- [ ] Touch interactions work as expected
- [ ] Data loads correctly
- [ ] Items scroll smoothly
- [ ] Selection callbacks trigger
- [ ] Performance is acceptable (no lag)
- [ ] Works on device (not just preview)
- [ ] Edge cases handled (empty data, single item, etc.)
- [ ] No console errors or warnings

### Test Cases to Consider

1. **Empty State**: Menu with no items
2. **Single Item**: Menu with one item
3. **Many Items**: Menu with 20+ items
4. **Rapid Scrolling**: Fast scroll gestures
5. **Data Changes**: Dynamic data updates
6. **Invalid Data**: Malformed JSON
7. **Selection**: Item tap interactions
8. **Bounds**: Scroll limits

## Submitting Changes

### Pull Request Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, documented code
   - Follow coding standards
   - Test thoroughly

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Clear description of changes"
   ```
   
   Use clear commit messages:
   - `feat: Add new feature`
   - `fix: Fix specific bug`
   - `docs: Update documentation`
   - `refactor: Refactor code`
   - `test: Add tests`
   - `chore: Routine maintenance`

4. **Push to Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out PR template

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested in Lens Studio preview
- [ ] Tested on Snap Spectacles device
- [ ] No console errors
- [ ] Performance acceptable

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)

## Screenshots/Videos
If applicable, add screenshots or videos

## Additional Notes
Any other relevant information
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, PR will be merged
4. Your contribution will be credited

## Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Open a GitHub Issue
- **Chat**: (Add Discord/Slack if available)
- **Documentation**: See README.md, SETUP.md, API.md

## Recognition

Contributors will be:
- Listed in release notes
- Credited in CONTRIBUTORS.md (if created)
- Thanked in the community

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Dynamic Scroll Menu! Your efforts help make this project better for everyone.
