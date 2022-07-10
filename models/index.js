const User = require('./User');
const Post = require('./Post');
const Yes = require('./Yes')

// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

User.belongsToMany(Post, {
  through: Yes,
  as: 'yessed_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Yes,
  as: 'yessed_posts',
  foreignKey: 'post_id'
});

Yes.belongsTo(User, {
  foreignKey: 'user_id'
});

Yes.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Yes, {
  foreignKey: 'user_id'
});

Post.hasMany(Yes, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Yes };