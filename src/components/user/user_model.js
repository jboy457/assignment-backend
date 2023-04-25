module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      role: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      timestamp: true,
      scopes: {
        withoutPassword: {
          attributes: { exclude: ['password'] }
        }
      }
    }
  );

  User.associate = (models) => {
    User.hasMany(models.UserAssignment, {
      onDelete: 'cascade'
    });

    User.hasMany(models.Assignment, {
      onDelete: 'cascade'
    });
  };
  return User;
};
