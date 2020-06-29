const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String
            },
            name: {
                type: String
            },
            duration: {
                type: Number
            },
            weight: {
                type: Number
            },            
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
      }
    ]
});

workoutSchema.statics.totalDuration = function() {
    let total = 0;
    for (let i = 0; i < this.exercises.length; i++){
        total += this.exercises.duration
    }
    return total;
}

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;