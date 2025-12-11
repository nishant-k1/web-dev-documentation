import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://jsonplaceholder.typicode.com/users", () => {
    return HttpResponse.json([
      { name: "Nishant_1" },
      { name: "Nishant_2" },
      { name: "Nishant_3" },
      { name: "Nishant_4" },
    ]);
  }),
];
