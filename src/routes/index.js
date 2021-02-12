const { Router } = require('express');
const axios = require('axios');
const cacheRedis = require('../config/redis'); 

const routes = Router();

routes.get('/jobs', async (req, res) => {
  
  const searchTerm = req.query.search;
    try {
      const jobs = await cacheRedis.getCache(searchTerm);
      if (jobs) {
        return res.status(200).send({
          jobs: JSON.parse(jobs),
          message: "data retrieved from the cache"
        });
      } else {
        const jobs = await axios.get(`https://jobs.github.com/positions.json?search=${searchTerm}`);
        cacheRedis.save(searchTerm, JSON.stringify(jobs.data), 600);
        return res.status(200).send({
          jobs: jobs.data,
          message: "cache miss"
        });
      }
    } catch(err) {
       res.status(500).send({message: err.message});
    }

});

module.exports = routes;