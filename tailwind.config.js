// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: ["class"],
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     "./app/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//       screens: {
//         "2xl": "1400px",
//       },
//     },
//     extend: {
//       colors: {
//         // Purple theme colors
//         border: "hsl(270, 50%, 85%)",        // Light purple border
//         input: "hsl(270, 50%, 85%)",         // Input border
//         ring: "hsl(270, 68%, 60%)",          // Focus ring
//         background: "hsl(0, 0%, 100%)",      // White background
//         foreground: "hsl(270, 50%, 25%)",    // Dark purple text
//         primary: {
//           DEFAULT: "hsl(270, 68%, 60%)",     // Primary purple
//           foreground: "hsl(0, 0%, 100%)",    // White text on primary
//         },
//         secondary: {
//           DEFAULT: "hsl(270, 30%, 95%)",     // Very light purple
//           foreground: "hsl(270, 50%, 25%)",  // Dark purple text
//         },
//         destructive: {
//           DEFAULT: "hsl(0, 84%, 60%)",       // Red for destructive actions
//           foreground: "hsl(0, 0%, 100%)",
//         },
//         muted: {
//           DEFAULT: "hsl(270, 20%, 96%)",     // Very light purple
//           foreground: "hsl(270, 10%, 55%)",  // Grayish purple text
//         },
//         accent: {
//           DEFAULT: "hsl(270, 68%, 70%)",     // Lighter purple accent
//           foreground: "hsl(0, 0%, 100%)",    // White text
//         },
//         popover: {
//           DEFAULT: "hsl(0, 0%, 100%)",      // White background
//           foreground: "hsl(270, 50%, 25%)",  // Dark purple text
//         },
//         card: {
//           DEFAULT: "hsl(0, 0%, 100%)",      // White cards
//           foreground: "hsl(270, 50%, 25%)",  // Dark purple text
//         },

//         // Dark mode colors
//         dark: {
//           border: "hsl(270, 30%, 25%)",
//           input: "hsl(270, 30%, 25%)",
//           ring: "hsl(270, 68%, 60%)",
//           background: "hsl(270, 30%, 10%)",  // Dark purple background
//           foreground: "hsl(270, 30%, 90%)",  // Light purple text
//           primary: {
//             DEFAULT: "hsl(270, 68%, 60%)",
//             foreground: "hsl(0, 0%, 100%)",
//           },
//           secondary: {
//             DEFAULT: "hsl(270, 30%, 20%)",
//             foreground: "hsl(270, 30%, 90%)",
//           },
//           muted: {
//             DEFAULT: "hsl(270, 30%, 15%)",
//             foreground: "hsl(270, 20%, 70%)",
//           },
//           accent: {
//             DEFAULT: "hsl(270, 68%, 50%)",
//             foreground: "hsl(0, 0%, 100%)",
//           },
//           popover: {
//             DEFAULT: "hsl(270, 30%, 15%)",
//             foreground: "hsl(270, 30%, 90%)",
//           },
//           card: {
//             DEFAULT: "hsl(270, 30%, 15%)",
//             foreground: "hsl(270, 30%, 90%)",
//           },
//         }
//       },
//       borderRadius: {
//         lg: "0.5rem",
//         md: "calc(0.5rem - 2px)",
//         sm: "calc(0.5rem - 4px)",
//       },
//       keyframes: {
//         "accordion-down": {
//           from: { height: 0 },
//           to: { height: "var(--radix-accordion-content-height)" },
//         },
//         "accordion-up": {
//           from: { height: "var(--radix-accordion-content-height)" },
//           to: { height: 0 },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// }

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7', // Main purple
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Map to your COLOR_THEME
        border: '#d8b4fe', // purple-300
        input: '#d8b4fe',  // purple-300
        ring: '#9333ea',   // purple-600
      }
    }
  }
}