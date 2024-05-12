import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const { promisify } = require('util');
const mkdir = promisify(require('fs').mkdir);

const fs = require('fs').promises;
