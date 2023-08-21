const { renderDom } = require("./dom.test");

let dom;
let document;

describe("index.html", () => {
    beforeEach(async () => {
        // path of index.html
        dom = await renderDom("../index.html");
        document = await dom.window.document;
    });

    test("has a button", () => {
        const btn = document.querySelector("button");
        expect(btn).toBeTruthy();
    });

    test("h1 is empty when the website loads", () => {
        const h1 = document.querySelector("h1");
        expect(h1.innerHTML).toContain("");
    });

    test("displays morning when the btn is clicked", () => {
        const btn = document.querySelector("button");
        btn.click();
        const h1 = document.querySelector("h1");
        expect(h1).toContain("morning");
    });

    test("adds the input to the h1", () => {
        const form = document.querySelector("form");
        const h1 = document.querySelector("h1");

        const input = document.querySelector("#name");
        input.value = "romeo";
        form.dispathEvent(new dom.window.Event("submit"));

        expect(h1.innerHTML).toContain(input.value);
    });
});
