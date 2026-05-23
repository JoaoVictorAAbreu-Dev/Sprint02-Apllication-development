export const logger = {
  info: (message: string, payload?: unknown) => {
    if (import.meta.env.DEV) {
      console.info(message, payload);
    }
  },
  error: (message: string, payload?: unknown) => {
    console.error(message, payload);
  },
};
