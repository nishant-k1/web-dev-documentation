console.log("typescript is here");
const mainElement: HTMLElement | null = document.querySelector(".main");
const childElement: HTMLHeadingElement = document.createElement("h1");
childElement.innerText = "Nishant Kumar";
mainElement?.append(childElement);
