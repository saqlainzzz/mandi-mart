import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";
import Header from "./components/Header";

export const metadata = {
  title: "Mandi Mart",
  description: "Community Bulk Buying Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem("theme");
                if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                  document.documentElement.classList.add("dark");
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <Header />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
