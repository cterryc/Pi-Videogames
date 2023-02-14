const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allownull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    released: {
      type: DataTypes.DATE,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },{
    timestamps: false
  });
};

/* 
El modelo de la base de datos deberá tener las siguientes entidades (Aquellas propiedades marcadas con asterísco deben ser obligatorias):

[ ] Videojuego con las siguientes propiedades:
ID: * No puede ser un ID de un videojuego ya existente en la API rawg
Nombre *
Descripción *
Fecha de lanzamiento
Rating
Plataformas *
*/
