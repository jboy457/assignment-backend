module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      code: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    { timestamp: true }
  );

  Course.associate = (models) => {
    Course.hasMany(models.Assignment, {
      onDelete: 'cascade'
    });
  };
  return Course;
};
