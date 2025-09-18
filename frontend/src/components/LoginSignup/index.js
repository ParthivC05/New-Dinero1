'use client';
import UserForm from './UserForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FORGOT_PASSWORD, SIGNIN, SIGNUP } from './constant';
import { getAccessToken } from '@/services/storageUtils';
import { isEmpty } from '@/lib/utils';
import CustomToast from '@/common/components/custom-toaster';
import useSignup from './hooks/useSignup';
import useGeoLocation from '@/common/hook/useGeoLocation';
import Login from '@/components/LoginSignup/components/login';
import Signup from './components/signup';

const US_STATE_NAME_TO_CODE = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
};

// Blocked US states
const BLOCKED_STATES = ['MI', 'ID', 'WA', 'LA', 'NV', 'MT', 'CT', 'HI', 'DE'];

// Allowed IP addresses (exceptions to state blocking)
const ALLOWED_IPS = ['50.158.74.231'];

// Only India + US are allowed
const ALLOWED_COUNTRIES = ['US', 'IN'];

// Explicitly blocked countries
const BLOCKED_COUNTRIES = ['MX']; // Mexico

function normalizeState(stateCode, stateName) {
  if (stateCode) {
    let code = stateCode.toUpperCase();
    if (code.includes('-')) code = code.split('-').pop();
    return code;
  }
  if (stateName) {
    return US_STATE_NAME_TO_CODE[stateName.trim()] || stateName.toUpperCase();
  }
  return null;
}

// Function to fetch client IP address
async function fetchClientIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Failed to fetch client IP:', error);
    return null;
  }
}

function isBlockedRegion(geo, clientIP = null) {
  if (!geo) return true;

  const stateCode = normalizeState(geo.state_code, geo.state_name);

  // Check if IP is in allowed list (bypasses all other checks)
  if (clientIP && ALLOWED_IPS.includes(clientIP)) {
    return false;
  }

  // Block if not in allowed list
  if (!ALLOWED_COUNTRIES.includes(geo.country_code)) return true;

  // Block explicit restricted countries
  if (BLOCKED_COUNTRIES.includes(geo.country_code)) return true;

  // India is fully allowed
  if (geo.country_code === 'IN') return false;

  // For US, only allow states not in BLOCKED_STATES
  if (geo.country_code === 'US' && BLOCKED_STATES.includes(stateCode))
    return true;

  return false; // Otherwise allowed
}

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newPasswordKey = searchParams.get('newPasswordKey');

  const token = getAccessToken();
  const [open, setOpen] = useState(isEmpty(token));
  const [isAuthenticated, setIsAuthenticated] = useState(!isEmpty(token));
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [toastState, setToastState] = useState({
    showToast: false,
    message: '',
    status: '',
  });

  const { signupData, signupLoading } = useSignup();
  const location = useGeoLocation();
  const [geoInfo, setGeoInfo] = useState(null);
  const [geoBlock, setGeoBlock] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const hasToken = !isEmpty(getAccessToken());
      setIsAuthenticated(hasToken);
      setOpen(!hasToken);
    };
    checkToken();
    const timeoutId = setTimeout(checkToken, 100);
    window.addEventListener('storage', checkToken);
    window.addEventListener('focus', checkToken);
    const intervalId = setInterval(checkToken, 500);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      window.removeEventListener('storage', checkToken);
      window.removeEventListener('focus', checkToken);
    };
  }, [router]);

  useEffect(() => {
    async function fetchGeo() {
      if (
        location.loaded &&
        !location.error &&
        location.coordinates.lat &&
        location.coordinates.lng
      ) {
        try {
          // Fetch client IP in parallel with geolocation
          const [ipResponse, geoResponse] = await Promise.all([
            fetchClientIP(),
            fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.coordinates.lat}&longitude=${location.coordinates.lng}&localityLanguage=en`
            ),
          ]);

          const clientIP = ipResponse;
          const geoData = await geoResponse.json();

          const geo = {
            country_code: geoData.countryCode,
            state_code: geoData.principalSubdivisionCode?.split('-')[1],
            state_name: geoData.principalSubdivision,
          };
          setGeoInfo(geo);

          if (isBlockedRegion(geo, clientIP)) {
            setGeoBlock(true);
            setToastState({
              showToast: true,
              message: 'Access from your region is restricted.',
              status: 'error',
            });
          }
        } catch (error) {
          console.error('Error fetching geo/IP data:', error);
        }
      }
    }
    fetchGeo();
  }, [location]);

  if (pathname === '/reset-password' && newPasswordKey) {
    return null;
  }
  console.log(isLogin);
  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => isOpen && isAuthenticated && setOpen(isOpen)}
        modal
        className="w-full"
      >
        <DialogTitle />
        <DialogContent
          onPointerDownOutside={(e) => e.preventDefault()}
          className="p-2 border-radius-0 gap-0 w-full sm:w-[800px] max-w-[98%] flex border-none"
        >
          <DialogHeader className="w-full">
            <div className="flex w-full h-full flex-col sm:flex-row">
              {isLogin ? (
                <Login setIsLogin={setIsLogin} />
              ) : (
                <Signup setIsLogin={setIsLogin} />
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <CustomToast
        showToast={toastState.showToast}
        setShowToast={(val) =>
          setToastState((prev) => ({ ...prev, showToast: val }))
        }
        message={toastState.message}
        status={toastState.status}
        duration={2000}
      />
    </>
  );
};

export default LoginSignup;
