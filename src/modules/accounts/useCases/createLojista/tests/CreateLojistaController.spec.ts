/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("LOJISTA - Create Lojista Controller", () => {
    it("Deve ser capaz de criar um lojista e adicionar um Log", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const lojistaNovo = await request(app)
            .post("/lojistas")
            .send({
                nome: "mauricio",
                username: "mauricio",
                senha: "mauricio",
            })
            .set({ Authorization: `Bearer ${token}` });

        const novoLojistaLogin = await request(app)
            .post("/sessions")
            .send({ username: "mauricio", senha: "mauricio" });

        const log = lojistaNovo.body[1];

        expect(novoLojistaLogin.body).toHaveProperty("token");

        expect(lojistaNovo.status).toBe(201);
        expect(log.descricao).toBe("Lojista Criado com Sucesso!");
    });

    it("Não deve ser capaz de criar um lojista com mesmo username", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/lojistas")
            .send({
                nome: "admin",
                username: "admin",
                senha: "admin",
            })
            .set({ Authorization: `Bearer ${token}` });

        expect(response.body.message).toBe("Lojista already exists");
    });

    it("Não deve ser capaz de criar um lojista se não estiver logado", async () => {
        const response = await request(app).post("/lojistas").send({
            nome: "mauricio",
            username: "mauricio",
            senha: "mauricio",
        });

        expect(response.body.message).toBe("Token missing");
    });

    it("Não deve ser capaz de criar um lojista se o token for invalido ou expirado", async () => {
        const response = await request(app)
            .post("/lojistas")
            .send({
                nome: "mauricio",
                username: "mauricio",
                senha: "mauricio",
            })
            .set({ Authorization: `Bearer 1111` });

        expect(response.body.message).toBe("Invalid Token");
    });
});
