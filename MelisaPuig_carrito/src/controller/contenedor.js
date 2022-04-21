const persistenciaContenedor = require("../persistencia/contenedor");

class Contenedor {
  async exists(id) {
    return persistenciaContenedor.exists(id);
  }

  async save(newProduct) {
    return persistenciaContenedor.save(newProduct);
  }

  async getById(id) {
    return persistenciaContenedor.getById(id);
  }

  async getAll() {
    return persistenciaContenedor.getAll();
  }

  async update(id, productData) {
    return persistenciaContenedor.update(id, productData);
  }

  async deleteById(id) {
    return persistenciaContenedor.deleteById(id);
  }

  async deleteAll() {
    return persistenciaContenedor.deleteAll();
  }
}

module.exports = new Contenedor();
