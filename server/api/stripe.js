const router = require('express').Router()
const {STRIPE_SECRET} = require('../../secrets')
const stripe = require('stripe')

const configedStripe = stripe(process.env.STRIPE_SECRET || STRIPE_SECRET)

module.exports = router

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({error: stripeErr})
  } else {
    res.status(200).send({success: stripeRes})
  }
}

router.post('/', async (req, res) => {
  await configedStripe.charges.create(req.body, postStripeCharge(res))
})
