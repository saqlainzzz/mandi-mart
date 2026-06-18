import "./globals.css";

export const metadata = {
  title: "Mandi Mart",
  description: "Community Bulk Buying Platform",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        
          {children}
        
      </body>
    </html>
  );
}