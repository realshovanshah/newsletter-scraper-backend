import mongoose from 'mongoose'

const NewsletterSchema = new mongoose.Schema({
    issueNo: {
        type: Number,
        required: true
    },
    posts: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

export = mongoose.model('Newsletter', NewsletterSchema)