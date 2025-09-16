'use client';
import { useState } from 'react';
import Banner from './banner';
import GoogleFacebookSignupButton from './googleSignupButton';
import { SIGNUP } from '../constant';
import { isEmpty } from '@/lib/utils';
import UserForm from '../UserForm';
import { getAccessToken } from '@/services/storageUtils';
import SignupStepper from './stepper';

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

function Signup() {
  const token = getAccessToken();
  const [open, setOpen] = useState(isEmpty(token));
  const [toastState, setToastState] = useState({
    showToast: false,
    message: '',
    status: '',
  });
  const [geoInfo, setGeoInfo] = useState(null);
  const [geoBlock, setGeoBlock] = useState(false);
  return (
    <div className="w-1/2 bg-custom-gradient  ">
      <div className='flex justify-center items-center'>
        <SignupStepper/>
        <div className="flex-row  justify-center items-center">
          <Banner />
          <UserForm
            controls={SIGNUP}
            isSignUp
            setOpen={setOpen}
            setToastState={setToastState}
            geoInfo={geoInfo}
            isBlocked={geoBlock}
          />
          <GoogleFacebookSignupButton />
        </div>
      </div>
    </div>
  );
}

export default Signup;
