## mongoose-mass-assign

This plugin provides two functions called #massAssign to your models. One static and one instance. You can use these to protect specific fields from web input. The plugin adds the schematype option 'protect' so you don't have to write any filtering code.

## Install

```
npm install mongoose-mass-assign
```

Current version 0.2.3

## Usage

Defining:

```js
var massAssign = require('mongoose-mass-assign');

var UserSchema = new mongoose.Schema({
  name      : String,
  admin     : { type: Boolean, protect: true, default: false },
  verified  : { type: Boolean, protect: true, default: false }
});

UserSchema.plugin(massAssign);

var User = mongoose.model('User', UserSchema);

```

Using:

```js

/** Static method, useful for creation **/

var user = User.massAssign({
  name: 'bhelx',
  admin: true
});

// user => { name: 'bhelx', admin: false, verified: false }

/** Instance method, useful for updating  **/
var user = new User;

user.massAssign({
  name: 'bhelx',
  admin: true
});

// user => { name: 'bhelx', admin: false, verified: false }

```
For more details see test.js

## Testing

```
npm install
```

```
make test
```

