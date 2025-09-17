import { StateProvider } from '@/store';
import './../../global.scss';

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 p-0 h-screen w-full bg-custom-gradient">
        <StateProvider>{children}</StateProvider>
      </body>
    </html>
  );
}
