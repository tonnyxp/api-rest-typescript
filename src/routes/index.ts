import { readdirSync } from "node:fs";
import { Router } from "express";

const PATH_ROUTER = `${__dirname}/`;
const router = Router();

const removeExtension = (fileName: string) => fileName.split(".").shift();

readdirSync(PATH_ROUTER).filter((file) => {
  const name = removeExtension(file);
  if (name !== "index") {
    import(`./${name}.route`).then((module) => {
      router.use(`/${name}`, module.default);
      // console.log(`Cargando ruta ${name}`);
    });
  }
});

router.get('*', (req, res) => {
  res.status(404)
  res.send({ error: 'Not found' })
})

export default router;
