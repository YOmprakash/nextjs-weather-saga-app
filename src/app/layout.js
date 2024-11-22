import ReduxProvider from '../components/ReduxProvider';
import "./globals.css";

export const metadata = {
  title: "Weather App",
  description: "Generated simple weather app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
