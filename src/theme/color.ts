// colors.ts
export const colors = (type: "mui" | "tailwind") => {
    const defaultKey = type === "mui" ? "main" : "DEFAULT"
    return {
        primary: {
            [defaultKey]: "#cc9966",
            300: "rgba(204, 153, 102, 0.3)",
            500: "rgba(204, 153, 102, 0.5)",
        },
        secondary: {
            [defaultKey]: "#cc6666",
        },
        black: {
            [defaultKey]: "#000000",
            50: "#222222",
            75: "#333333",
            100: "#666666",
            200: "#999999",
            300: "#ebebeb",
            400: "rgba(255, 255, 255, 0.1)",
            500: "#777777",
            600: "#cccccc",
        },
    }

} 