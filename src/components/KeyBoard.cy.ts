import KeyBoard from "./KeyBoard.vue";
import { Keys } from "@/utils/GameTypes";

describe("<KeyBoard />", () => {
  it("renders", () => {
    cy.mount(KeyBoard, {
      props: {
        wrongLetters: [],
        lettersInWord: [],
        correctLetters: [],
      },
    });

    // check for all rows of keys
    const rows = [
      "qwertyuiop".split(""),
      "asdfghjkl".split(""),
      "zxcvbnm".split(""),
    ];

    rows.forEach((row, idx) => {
      cy.get(`[data-test='keyboard-row-${idx}']`).within(() => {
        row.forEach((letter) => {
          cy.get(`[data-test='key-${letter}']`)
            .should("have.text", letter)
            .should("have.class", "bg-gray-500");
        });
      });
    });

    // check for backspace and enter keys on bottom row
    // cy.get(`[data-test='keyboard-row-0']`)
    //   .contains(Keys.BACKSPACE)
    //   .should("be.visible");

    // cy.get(`[data-test='keyboard-row-0']`)
    //   .contains(Keys.ENTER)
    //   .should("be.visible");
  });

  it("should highlight letters", () => {
    cy.mount(KeyBoard, {
      props: {
        wrongLetters: ["z", "e", "b"],
        lettersInWord: ["r"],
        correctLetters: ["a"],
      },
    });

    cy.get("[data-test='key-z'").should("have.class", "bg-gray-800");
    cy.get("[data-test='key-e'").should("have.class", "bg-gray-800");
    cy.get("[data-test='key-b'").should("have.class", "bg-gray-800");
    cy.get("[data-test='key-r'").should("have.class", "bg-inword-400");
    cy.get("[data-test='key-a'").should("have.class", "bg-correct-600");
  });
});
