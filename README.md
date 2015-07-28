# idle
user idle/active events in node.js

```javascript
var idle = new Idle(90); // 90 seconds

idle.on('idle', function() {
  console.log('idle...');
});

idle.on('active', function() {
  console.log('active...');
});
```
