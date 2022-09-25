import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import KeyBoard from "../KeyBoard.vue";

describe("KeyBoard", () => {
  it("renders properly", () => {
    const wrapper = mount(KeyBoard, {
      props: {
        wrongLetters: [],
        lettersInWord: [],
        correctLetters: [],
      },
    });
    expect(wrapper.text()).toContain("a");
  });
});
