import Types from "sequelize";
import sequelize from "../services/mysql.js"

const Package = sequelize.define('Package',
    {
        id: {
            type: Types.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: Types.STRING,
        imageUrl: Types.STRING,
        description: Types.TEXT,
        view: {
            type: Types.INTEGER,
            defaultValue: 0
        },
        fileUrl: Types.STRING,
    })

export default Package
