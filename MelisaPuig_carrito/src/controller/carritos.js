const persistenciaCarritos = require("../persistencia/carritos");
const contenedor = require("./contenedor");

class Carritos {
  async exists(id) {
    return persistenciaCarritos.exists(id);
  }

  async add() {
    return persistenciaCarritos.add();
  }

  async getById(id) {
    return persistenciaCarritos.getById(id);
  }

  async addProducts(id, productIds) {
    try {
      const products = await contenedor.getAll();
      const addedProducts = [];
      productIds.forEach((productId) => {
        const searchedProduct = products.find((e) => e.id === productId);
        if (typeof searchedProduct === "undefined") {
          throw new Error(`No se encuentra el producto id ${productId}.`);
        }
        addedProducts.push(searchedProduct);
      });
      return persistenciaCarritos.addProducts(id, addedProducts);
    } catch (error) {
      throw error;
    }
  }

  async removeProduct(id, productId) {
    return persistenciaCarritos.removeProduct(id, productId);
  }

  async deleteById(id) {
    return persistenciaCarritos.deleteById(id);
  }
}

module.exports = new Carritos();
