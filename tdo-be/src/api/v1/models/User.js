const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate({ Profile }) {
            //this.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
        }

        async validatePassword(password) {
            return await bcrypt.compare(password, this.password);
        }
    }
    User.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: { msg: 'It must be a valid Email address' },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [8, 100],
                        msg: 'Password must be between 8 and 100 characters'
                    }
                }
            },
        },
        {
            sequelize,
            tableName: 'users',
            modelName: 'User',
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        user.password = await bcrypt.hash(user.password, 12);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.changed('password')) {
                        user.password = await bcrypt.hash(user.password, 12);
                    }
                }
            }
        },
    );
    return User;
};
