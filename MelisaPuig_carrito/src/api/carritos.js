const carritos = require("../controller/carritos");

class APICarritos {
  constructor() {
    /**
     * Hago el "bind" para que las funciones vean al "this" como este objeto
     * al ser llamadas desde el middleware.
     */
    this.add = this.add.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.addProducts = this.addProducts.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }

  async add(req, res, next) {
    try {
      const result = await carritos.add();
      res.send({ result });
    } catch (error) {
      next(error);
    }
  }

  async deleteById(req, res, next) {
    try {
      const id = Number.parseInt(req.params.id, 10);
      await this._throwErrorIfNotExists(id);
      await carritos.deleteById(id);
      res.send({ result: true });
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req, res, next) {
    try {
      const id = Number.parseInt(req.params.id, 10);
      await this._throwErrorIfNotExists(id);
      const searchedCarrito = await carritos.getById(id);
      const productos = searchedCarrito.productos;
      res.send({ productos });
    } catch (error) {
      next(error);
    }
  }

  async addProducts(req, res, next) {
    try {
      const carritoId = Number.parseInt(req.params.id, 10);
      const { productIds } = req.body;
      await this._throwErrorIfNotExists(carritoId);
      const result = await carritos.addProducts(carritoId, productIds);
      res.send({ result });
    } catch (error) {
      next(error);
    }
  }

  async removeProduct(req, res, next) {
    try {
      const carritoId = Number.parseInt(req.params.id, 10);
      const productId = Number.parseInt(req.params.id_prod, 10);
      await this._throwErrorIfNotExists(carritoId);
      const result = await carritos.removeProduct(carritoId, productId);
      res.send({ result });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PRIVATE METHODS.
   */

  async _throwErrorIfNotExists(id) {
    try {
      const exists = await carritos.exists(id);
      if (!exists) {
        throw new Error("Carrito no encontrado");
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new APICarritos();
