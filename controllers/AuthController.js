const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const express = require('express');
const uuidv4 = require('uuid').v4;

const sha1 = require('sha1');

exports.getConnect = async function getConnect(req, res) {
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const buff = Buffer.from(auth.split(' ')[1], 'base64');
  const [email, password] = buff.toString('utf-8').split(':');
  if (!email || !password) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const user = await dbClient.getUser(email, sha1(password));
  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  token = uuidv4();
  const key = 'auth_' + token;
  await redisClient.set(key, user._id.toString(), 86400);
  res.status(200).json({ token });
};
exports.getDisconnect = async function getDisconnect(req, res) {
  let token = req.headers['x-token'];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const key = `auth_${token}`;
  const userId = await redisClient.get(key);
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  await redisClient.del(key);
  res.sendStatus(204);
};
