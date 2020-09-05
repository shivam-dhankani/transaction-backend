'use strict';
var Schema = mongoose.Schema;

var transaction = new Schema({
 
},{
    timestamps: true,
    strict: false
}
);
module.exports = mongoose.model("bulkNotification", transaction);