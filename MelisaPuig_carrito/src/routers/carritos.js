const express = require("express");

const apiUtils = require("../api/apiUtils");
const apiCarritos = require("../api/carritos");
const router = express.Router();

router.post("/", apiCarritos.add);
router.delete("/:id", apiCarritos.deleteById);
router.get("/:id/productos", apiCarritos.getProducts);
router.post("/:id/productos", apiCarritos.addProducts);
router.delete("/:id/productos/:id_prod", apiCarritos.removeProduct);

router.all("*", (req, res) => apiUtils.throwMethodNotFoundError(req, res));

router.use((error, req, res, next) => {
  console.error(error);
  res.send({ error: error.message });
});

module.exports = router;
