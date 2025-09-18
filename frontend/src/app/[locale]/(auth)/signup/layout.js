import { StateProvider } from '@/store';
import './../../global.scss';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <StateProvider>
          {children}
          <Toaster />
        </StateProvider>
      </body>
    </html>
  );
}
