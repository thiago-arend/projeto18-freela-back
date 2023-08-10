import { insertProduct, selectProduct, selectProducts } from "../repositories/product.repository.js";

export async function createProduct(req, res) {
    const { userId } = res.locals.session;

    try {
        await insertProduct({ ...req.body, sellerId: userId });

        res.sendStatus(201);
    } catch (err) {

        if (Number(err.code) === 23505) return res.status(409).send({ message: "Já existe um filme com esse nome!" });

        res.status(500).send(err.message);
    }
}

export async function getProducts(req, res) {

    try {
        const result = await selectProducts(req.query);

        res.status(200).send(result.rows);
    } catch (err) {

        res.status(500).send(err.message);
    }
}

export async function getProduct(req, res) {
    const { id } = req.params;

    try {
        const result = await selectProduct(id);
        if (result.rowCount === 0) return res.status(404).send({ message: "Produto não encontrado!" });

        res.status(200).send(result.rows[0]);
    } catch (err) {

        res.status(500).send(err.message);
    }
}