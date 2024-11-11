const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task: String,
    isCompleted: Boolean,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user"}
});

const Task = mongoose.model("task", TaskSchema);

module.exports = Task