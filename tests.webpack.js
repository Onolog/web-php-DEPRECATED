var context = require.context('./webroot/js/__test__', true, /Spec$/);
context.keys().forEach(context);
