const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model { 
  static yes(body, models) {
    return models.Yes.create({
    user_id: body.user_id,
    post_id: body.post_id
  }).then(() => {
    // then find the post we just Yesd on
    return Post.findOne({
      where: {
        id: body.post_id
      },
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at',
        // use raw MySQL aggregate function query to get a count of how many Yess the post has and return it under the name `Yes_count`
        [
          sequelize.literal('(SELECT COUNT(*) FROM yes WHERE post.id = yes.post_id)'),
          'yes_count'
        ]
      ]
    })
  });
  }
}

// create fields/columns for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;