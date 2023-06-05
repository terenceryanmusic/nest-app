export default () => ({
  mongodb: process.env.MONGO_DB_CONN || 'mongodb://localhost:27017',
});
