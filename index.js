/** From underscore **/
var ArrayProto = Array.prototype;

var contains = function(obj, target) {
  if (obj == null) return false;
  return obj.indexOf(target) != -1;
};

var omit = function (obj) {
  var copy = {};
  var keys = ArrayProto.concat.apply(ArrayProto, ArrayProto.slice.call(arguments, 1));
  for (var key in obj) {
    if (!contains(keys, key)) copy[key] = obj[key];
  }
  return copy;
};

/** end underscore */

module.exports = function (mongoose) {

  mongoose.Schema.prototype.protectedFields = function () {
    var protectedFields = [];
    for (var k in this.tree){
      if (this.tree[k].protect){
        protectedFields.push(k);
      }
    }
    return protectedFields;
  };

  mongoose.Model.prototype.massAssign = function (body) {
    return this.set(omit(body, this.schema.protectedFields()));
  }

  mongoose.Model.massAssign = function (body) {
    var obj = new this();
    return obj.massAssign(body);
  };

};