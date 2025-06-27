import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import LetterBlock from "../LetterBlock.vue";

describe("LetterBlock", () => {
  it("renders a letter with correct styling", () => {
    const wrapper = mount(LetterBlock, {
      props: {
        letter: "A",
        correct: true,
      },
    });

    expect(wrapper.text()).toBe("A");
    expect(wrapper.classes()).toContain("bg-correct-500");
  });

  it("applies darker gray for wrong letters", () => {
    const wrapper = mount(LetterBlock, {
      props: {
        letter: "X",
        correct: false,
        inWord: false,
      },
    });

    expect(wrapper.classes()).toContain("bg-incorrect-600");
  });

  it("applies revealing animation when isRevealing is true", () => {
    const wrapper = mount(LetterBlock, {
      props: {
        letter: "B",
        isRevealing: true,
        animationDelay: 100,
      },
    });

    expect(wrapper.classes()).toContain("letter-revealing");
    expect(wrapper.attributes("style")).toContain("animation-delay: 100ms");
  });

  it("applies in-word styling", () => {
    const wrapper = mount(LetterBlock, {
      props: {
        letter: "C",
        inWord: true,
      },
    });

    expect(wrapper.classes()).toContain("bg-inword-300");
  });
});