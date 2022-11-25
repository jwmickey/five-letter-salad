import { computed, inject } from "vue";
import type { ComputedRef, InjectionKey } from "vue";
import { GameManager } from "./GameManager";

export const MANAGER_INJECTION_KEY: InjectionKey<ComputedRef<GameManager>> =
  Symbol("GAME_MANAGER");

export function useGameManager() {
  const manager = inject(
    MANAGER_INJECTION_KEY,
    computed(() => new GameManager(window))
  );
  if (!manager) {
    throw new Error("Manager is not defined");
  }
  return manager.value;
}
