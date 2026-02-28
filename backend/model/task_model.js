import mongoose from 'mongoose'
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        default:'pending'
    },
    createdAt: {
    type: Date,
    default: Date.now
  }
})
export default mongoose.model('tasks',taskSchema)