// ~/plugins/clickOutside.ts
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("click-outside", {
    mounted(
      el: HTMLElement & { _h: any },
      binding: any
    ) {
      const handler = (event: MouseEvent) => {
        // Check if the clicked target is outside the element
        if (
          el &&
          !el.contains(event.target as Node) &&
          typeof binding.value === "function"
        ) {
          binding.value(event);
        }
      };
      // Save the handler to the element's dataset for later removal
      el._h = handler;

      // Add event listener to the whole document
      document.addEventListener("click", handler);
    },
    unmounted(el: HTMLElement & { _h: any }) {
      // Remove the event listener when the element is unmounted
      document.removeEventListener("click", el._h);
      delete el._h;
    },
  });
});
