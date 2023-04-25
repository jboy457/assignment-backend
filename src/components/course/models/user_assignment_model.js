module.exports = (sequelize, DataTypes) => {
  const UserAssignment = sequelize.define(
    'UserAssignment',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      assignment_id: {
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
        allowNull: true
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    { timestamp: true }
  );

  UserAssignment.associate = (models) => {
    UserAssignment.belongsTo(models.Assignment, {
      foreignKey: 'assignment_id'
    });
    UserAssignment.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return UserAssignment;
};
