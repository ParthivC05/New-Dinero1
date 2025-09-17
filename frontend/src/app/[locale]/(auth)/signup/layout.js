import { StateProvider } from '@/store';
import './../../global.scss';

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <StateProvider>{children}</StateProvider>
      </body>
    </html>
  );
}
