// app/layout.tsx
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata = {
  title: "Inventory Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
      </body>
    </html>
  );
}
