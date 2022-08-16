import { Router } from "express";
import { CreateContasController } from "@modules/contas/useCases/CreateContasUseCase/CreateContasController";
import { RealizarPagamentoController } from "@modules/contas/useCases/RealizarPagamentoUseCase/RealizarPagamentoController";
import { ListContasController } from "@modules/contas/useCases/ListContasUseCase/ListContasController";
import { FindContaByIdController } from "@modules/contas/useCases/findById/FindContaByIdController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const contasRoutes = Router();

const createContasController = new CreateContasController();
const realizarPagamentoController = new RealizarPagamentoController();
const listContasController = new ListContasController();
const findContaByIdController = new FindContaByIdController();

contasRoutes.post("/", ensureAuthenticated, createContasController.handle);
contasRoutes.post("/criacontastest", createContasController.handle);
contasRoutes.get("/", ensureAuthenticated, listContasController.handle);
contasRoutes.get(
    "/findbyid/:id",
    ensureAuthenticated,
    findContaByIdController.handle
);
contasRoutes.post(
    "/realizarPagamento/:idConta",
    ensureAuthenticated,
    realizarPagamentoController.handle
);

export { contasRoutes };
