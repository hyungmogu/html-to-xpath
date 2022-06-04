const htmlToXpath = require("./index.js");
const {
  JSDOM
} = require("jsdom");

let jsdom;

beforeAll(() => {
  const rawHTML = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>HTML 5 Boilerplate</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <header class="headerElement">
        <nav>
          <ul>
            <li class="testElement">hi</li>
            <li>hello</li>
          </ul>
        </nav>
      </header>
      <main class="mainElement">
        <ul>
          <li>
            <span>hi</span>
            <ul>
              <li>nested</li>
              <li class="testElementNested">nested 2</li>
            </ul>
          </li>
          <li>hello</li>
        </ul>
      </main>
      <script src="index.js"></script>
    </body>
  </html>`;
  jsdom =  new JSDOM(rawHTML);
})


test("Should raise error when arguement is not HTMLElement", () => {
  expect(() => htmlToXpath("a")).toThrow(Error);
});

test.only("Should raise error when arguement is an HTMLElement NOT in visible DOM", () => {
  const danglingElement = jsdom.window.document.createElement("a");
  expect(() => htmlToXpath(danglingElement)).toThrow(Error);
});

test.only("Should return correct xpath if selected body", () => {
  const expected = "//html/body[1]";
  const result = htmlToXpath(jsdom.window.document.querySelector("body"));

  expect(result).toBe(expected);
});

test.only("Should return correct xpath if selected a child node", () => {
  const expected = "//html/body[1]/header[1]/nav[1]/ul[1]/li[1]";
  const result = htmlToXpath(jsdom.window.document.querySelector("header .testElement"));

  expect(result).toBe(expected);
});

test.only("Should return correct xpath if selected deeply nested child node", () => {
  const expected = "//html/body[1]/main[1]/ul[1]/li[1]/ul[1]/li[2]";
  const result = htmlToXpath(jsdom.window.document.querySelector("main .testElementNested"));

  expect(result).toBe(expected);
});

