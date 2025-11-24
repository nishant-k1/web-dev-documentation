import "@testing-library/jest-dom";
import "@testing-library/react";
import { server } from "@/mockServices/server";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
