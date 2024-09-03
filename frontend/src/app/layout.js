import "./globals.css";

export const generateMetadata = () => ({
  title: "Simple ChatRoom",
  description: "Simple ChatRoom with webscoket",
});

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-[1920px]">{children}</body>
    </html>
  );
}
