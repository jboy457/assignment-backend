module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define(
    'Assignment',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      endDate: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    { timestamp: true }
  );

  Assignment.associate = (models) => {
    Assignment.belongsTo(models.Course, {
      foreignKey: 'course_id'
    });
    Assignment.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return Assignment;
};
