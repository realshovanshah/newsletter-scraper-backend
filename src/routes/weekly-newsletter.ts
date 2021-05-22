import express from 'express'
import { scrapeNewsletter } from '../data/scraper';
import Newsletter from '../entity/Newsletter';

const weeklyRouter = express.Router();

weeklyRouter.get('/', async (req, res) => {
    try {
        const newsletters = await Newsletter.find();
        res.json(newsletters)
    } catch (err) {
        res.json({ message: err })
        console.log(err.message)
    }
})

weeklyRouter.post('/', async (req, res) => {
    const newsletter = new Newsletter({
        issueNo: req.body.issueNo,
        posts: req.body.posts,
    })
    try {
        const savedNewsletter = await newsletter.save()
        res.json(savedNewsletter)
    } catch (err) {
        res.json({ message: err.message })
    }
})

// module.exports = weeklyRouter

export { weeklyRouter }