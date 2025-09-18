import { StateProvider } from '@/store';
import { Toaster } from '@/components/ui/toaster';

import './../../global.scss';
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
