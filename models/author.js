var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);

// Virtual for author's full name
AuthorSchema
    .virtual('name')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    });

// Virtual for author's URL
AuthorSchema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });

AuthorSchema
    .virtual('date_of_birth_formatted')
    .get(function () {
        return moment(this.date_of_birth).format("YYYY-MM-DD");
    });
AuthorSchema
    .virtual('date_of_death_formatted')
    .get(function () {
        return this.date_of_death? moment(this.date_of_death).format("YYYY-MM-DD") : 'N/A';
    });

AuthorSchema
    .virtual('lifespan')
    .get(function () {
        if (this.date_of_death) {
            return Math.floor((this.date_of_death - this.date_of_birth) / 31536000000);
        } else {
            return moment().diff(this.date_of_birth, 'years');
        }
    });


//Export model
module.exports = mongoose.model('Author', AuthorSchema);