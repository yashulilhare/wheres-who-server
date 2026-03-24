import {Router} from 'express'

const leaderboardRouter = Router()

leaderboardRouter.get('/', (req,res,next) => {
    res.send('got to leaderboard')
})

leaderboardRouter.post('/', (req,res,next) => {
    res.send('posted to leaderboard')
})

export default leaderboardRouter