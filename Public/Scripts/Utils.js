// @input float minValue = 0.0
// @input float maxValue = 1.0

/**
 * Utility functions for the Dynamic Scroll Menu
 * Provides common helper methods used across components
 */

// Clamp a value between min and max
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// Linear interpolation between two values
function lerp(start, end, t) {
    return start + (end - start) * t;
}

// Smooth interpolation (ease in/out)
function smoothstep(t) {
    return t * t * (3.0 - 2.0 * t);
}

// Map a value from one range to another
function map(value, inMin, inMax, outMin, outMax) {
    return outMin + (outMax - outMin) * ((value - inMin) / (inMax - inMin));
}

// Distance between two 2D points
function distance2D(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// Check if a point is within bounds
function isInBounds(point, bounds) {
    return point.x >= bounds.min.x && 
           point.x <= bounds.max.x && 
           point.y >= bounds.min.y && 
           point.y <= bounds.max.y;
}

// Format time in ms to readable string
function formatTime(milliseconds) {
    var seconds = Math.floor(milliseconds / 1000);
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// Deep clone an object
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Export functions via script API
script.api.clamp = clamp;
script.api.lerp = lerp;
script.api.smoothstep = smoothstep;
script.api.map = map;
script.api.distance2D = distance2D;
script.api.isInBounds = isInBounds;
script.api.formatTime = formatTime;
script.api.deepClone = deepClone;
