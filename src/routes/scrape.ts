import express from 'express'
import {scrapeNewsletter} from '../data/scraper';
import Newsletter from '../entity/Newsletter';  

export const scrapeRouter = express.Router();

scrapeRouter.get('/', async (req, res) => {
    try {
        const newsletters = await Newsletter.find();
        res.json(newsletters)
    } catch (err) {
        res.json({ message: err })
        console.log(err.message)
    }
})