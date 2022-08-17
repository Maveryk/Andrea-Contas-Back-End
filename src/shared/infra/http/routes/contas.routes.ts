import { Router } from "express";
import { CreateContasController } from "@modules/contas/useCases/CreateContasUseCase/CreateContasController";
import { RealizarPagamentoController } from "@modules/contas/useCases/RealizarPagamentoUseCase/RealizarPagamentoController";
import { ListContasController } from "@modules/contas/useCases/ListContasUseCase/ListContasController";
import { FindContaByIdController } from "@modules/contas/useCases/FindContaByIdUseCase/FindContaByIdController";
import { InativarContaController } from "@modules/contas/useCases/InativarContaUseCase/InativarContaController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const contasRoutes = Router();

const createContasController = new CreateContasController();
const realizarPagamentoController = new RealizarPagamentoController();
const listContasController = new ListContasController();
const findContaByIdController = new FindContaByIdController();
const inativarContaController = new InativarContaController();

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
contasRoutes.post(
    "/inativarConta/:idConta",
    ensureAuthenticated,
    inativarContaController.handle
);

export { contasRoutes };
