import CurrentGuess from "./CurrentGuess.vue";

describe("<CurrentGuess />", () => {
  it("renders", () => {
    const letters = "hello".split("");
    cy.mount(CurrentGuess, {
      props: {
        guessInProgress: letters,
      },
    });
    cy.get("div.flex > div").each((el, i) => {
      cy.wrap(el).should("contain.text", letters[i]);
    });
  });
});
