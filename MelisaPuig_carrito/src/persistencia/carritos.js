const fs = require("fs");
const path = require("path");

const BASE_FILE_PATH = path.join(__dirname, "carrito.txt");

class PersistenciaCarritos {
  constructor() {
    this.filePath = BASE_FILE_PATH;
  }

  async exists(id) {
    try {
      const carritos = await this._getCarritosFromFile();
      const searchedCarrito = carritos.find((e) => e.id === id);
      return typeof searchedCarrito !== "undefined";
    } catch (error) {
      throw error;
    }
  }

  async add() {
    try {
      const newCarrito = { timestamp: new Date(), productos: [] };

      const carritos = await this._getCarritosFromFile();
      let newCarritoId = 1;
      if (carritos.length > 0) {
        const entryIds = carritos.map((e) => e.id);
        const maxId = Math.max(...entryIds);
        newCarritoId = maxId + 1;
      }
      newCarrito.id = newCarritoId;
      carritos.push(newCarrito);
      await this._saveCarritosToFile(carritos);
      return newCarritoId;
    } catch (error) {
      throw new Error(`Ha ocurrido un error agregando el contenido: ${error}`);
    }
  }

  async getById(id) {
    try {
      const carritos = await this._getCarritosFromFile();
      const searchedCarrito = carritos.find((e) => e.id === id);
      if (typeof searchedCarrito === "undefined") {
        return null;
      }
      return searchedCarrito;
    } catch (error) {
      throw error;
    }
  }

  async addProducts(id, products) {
    try {
      const carritos = await this._getCarritosFromFile();
      const searchedCarritoIndex = carritos.findIndex((e) => e.id === id);
      if (typeof searchedCarritoIndex === -1) {
        throw new Error(`Carrito ${id} no encontrado.`);
      }
      carritos[searchedCarritoIndex].productos.push(...products);
      await this._saveCarritosToFile(carritos);
      return carritos[searchedCarritoIndex];
    } catch (error) {
      throw error;
    }
  }

  async removeProduct(id, productId) {
    try {
      const carritos = await this._getCarritosFromFile();
      const searchedCarritoIndex = carritos.findIndex((e) => e.id === id);
      if (typeof searchedCarritoIndex === -1) {
        throw new Error(`Carrito ${id} no encontrado.`);
      }
      const carritoProducts = carritos[searchedCarritoIndex].productos;
      carritos[searchedCarritoIndex].productos = carritoProducts.filter(
        (e) => e.id !== productId
      );
      await this._saveCarritosToFile(carritos);
      return carritos[searchedCarritoIndex];
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const carritos = await this._getCarritosFromFile();
      const filteredCarritos = carritos.filter((e) => e.id !== id);
      await this._saveCarritosToFile(filteredCarritos);
    } catch (error) {
      throw error;
    }
  }

  /**
   * PRIVATE METHODS.
   */
  async _getCarritosFromFile() {
    try {
      const fileExists = fs.existsSync(this.filePath);
      if (!fileExists) {
        return [];
      }
      const fileContent = await fs.promises.readFile(this.filePath, "utf8");
      const carritos = JSON.parse(fileContent);
      return carritos;
    } catch (error) {
      throw error;
    }
  }

  async _saveCarritosToFile(carritos) {
    try {
      const JSONCarritos = JSON.stringify(carritos);
      const fileExists = fs.existsSync(this.filePath);
      if (fileExists) {
        await fs.promises.unlink(this.filePath);
      }
      await fs.promises.writeFile(this.filePath, JSONCarritos, "utf-8");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PersistenciaCarritos();
