// app/components/BookingCalculator.tsx
'use client';

import { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Don't forget to import the styles

// --- CONFIGURATION (All prices in NGN) ---
const PRICES = {
  AIRPORT_HALF_DAY: 80000,  // 6 Hours
  AIRPORT_FULL_DAY: 100000,  // 12 Hours
  EVENT_VIP_HALF_DAY: 80000, // 6 Hours
  EVENT_VIP_FULL_DAY: 100000, // 12 Hours
  DAILY_RATE: 100000,
  SECURITY_FEE: 30000,
};
const WHATSAPP_NUMBER = '2348037331747'; // Your WhatsApp Number
// --- END CONFIGURATION ---

export default function BookingCalculator() {
  // --- SOURCE OF TRUTH STATE ---
  const [serviceType, setServiceType] = useState('Daily/Weekly Hire');
  const [serviceDuration, setServiceDuration] = useState('6hr'); // '6hr' or '12hr' for Airport/Event
  const [durationUnit, setDurationUnit] = useState('days');
  const [durationValue, setDurationValue] = useState(1);
  const [itinerary, setItinerary] = useState(''); // NEW: State for the itinerary message
  const [addSecurity, setAddSecurity] = useState(false);
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<Date | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');

  // --- DERIVED STATE & CALCULATIONS (The "Brain") ---
  const { baseCost, securityCost, totalCost, isFormValid, whatsappLink } = useMemo(() => {
    let bCost = 0;
    switch (serviceType) {
      case 'Airport Transfer':
        bCost = serviceDuration === '12hr' ? PRICES.AIRPORT_FULL_DAY : PRICES.AIRPORT_HALF_DAY;
        break;
      case 'Event/VIP':
        bCost = serviceDuration === '12hr' ? PRICES.EVENT_VIP_FULL_DAY : PRICES.EVENT_VIP_HALF_DAY;
        break;
      case 'Daily/Weekly Hire':
        const totalDays = durationUnit === 'weeks' ? durationValue * 7 : durationValue;
        bCost = PRICES.DAILY_RATE * totalDays;
        break;
    }

    const sCost = addSecurity ? PRICES.SECURITY_FEE : 0;
    const tCost = bCost + sCost;

    // UPDATE: Validation now checks for itinerary ONLY if Daily/Weekly Hire is selected
    const isItineraryValid = serviceType === 'Daily/Weekly Hire' ? itinerary.trim() !== '' : true;
    const valid = 
      !!pickupDate &&
      !!pickupTime &&
      fullName.trim() !== '' &&
      phone.trim() !== '' &&
      pickupAddress.trim() !== '' &&
      dropoffAddress.trim() !== '' &&
      isItineraryValid;

    let durationText = 'N/A';
    if (serviceType === 'Daily/Weekly Hire') {
      const totalDays = durationUnit === 'weeks' ? durationValue * 7 : durationValue;
      durationText = `${durationValue} ${durationUnit.charAt(0).toUpperCase() + durationUnit.slice(1)} (${totalDays} total days)`;
    } else if (serviceType === 'Airport Transfer' || serviceType === 'Event/VIP') {
      durationText = serviceDuration === '6hr' ? '6 Hours (Half Day)' : '12 Hours (Full Day)';
    }

    const formattedDate = pickupDate ? pickupDate.toLocaleDateString('en-GB') : 'N/A';
    const formattedTime = pickupTime ? pickupTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'N/A';
    
    // UPDATE: WhatsApp message now includes itinerary and a note about final pricing
    const message = `
*New Booking Request - Dennis Rental Naija*

*Customer:* ${fullName}
*Phone:* ${phone}

*Service Details:*
- *Type:* ${serviceType}
- *Duration:* ${durationText}
- *Pickup Date:* ${formattedDate}
- *Pickup Time:* ${formattedTime}
- *Pickup Address:* ${pickupAddress}
- *Drop-off Address:* ${dropoffAddress}

${serviceType === 'Daily/Weekly Hire' ? `*Customer Itinerary:*\n${itinerary}` : ''}

*Add-ons:*
- *Professional Security:* ${addSecurity ? 'Yes' : 'No'}

*--- Estimated Cost ---*
*Total:* *NGN ${tCost.toLocaleString()}*
${serviceType === 'Daily/Weekly Hire' ? '\n*NOTE: This is a base rate. Final price to be confirmed based on itinerary.*' : ''}
    `;

    const wLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message.trim())}`;
    
    return { 
      baseCost: bCost, 
      securityCost: sCost, 
      totalCost: tCost, 
      isFormValid: valid, 
      whatsappLink: wLink 
    };
  }, [
    serviceType, serviceDuration, durationUnit, durationValue, itinerary, addSecurity, 
    pickupDate, pickupTime, fullName, phone, pickupAddress, dropoffAddress
  ]);
  
  // --- STYLES ---
  const inputStyle = "w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition";
  const labelStyle = "block text-sm font-medium text-slate-700 mb-2";

  return (
    <section id="booking" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-slate-800">Get an Instant Quote & Book</h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Complete the form for a live price estimate and book your ride in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-3 bg-white rounded-lg border border-slate-200 shadow-lg p-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">1. Service Details</h3>
            
            {/* Service Type */}
            <div>
              <label htmlFor="serviceType" className={labelStyle}>Service Type</label>
              <select id="serviceType" value={serviceType} onChange={(e) => setServiceType(e.target.value)} className={inputStyle}>
                <option>Airport Transfer</option>
                <option>Daily/Weekly Hire</option>
                <option>Event/VIP</option>
              </select>
            </div>

            {/* Conditional Duration Controls for Airport/Event */}
            {(serviceType === 'Airport Transfer' || serviceType === 'Event/VIP') && (
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <label className={labelStyle}>Select Duration</label>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input type="radio" id="6hr" name="serviceDuration" value="6hr" checked={serviceDuration === '6hr'} onChange={(e) => setServiceDuration(e.target.value)} />
                    <label htmlFor="6hr" className="ml-2">6 Hours (Half Day)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="12hr" name="serviceDuration" value="12hr" checked={serviceDuration === '12hr'} onChange={(e) => setServiceDuration(e.target.value)} />
                    <label htmlFor="12hr" className="ml-2">12 Hours (Full Day)</label>
                  </div>
                </div>
              </div>
            )}

            {/* Conditional Duration Controls for Daily/Weekly */}
            {serviceType === 'Daily/Weekly Hire' && (
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
                <div className="flex items-center space-x-4">
                  <label className={labelStyle}>Duration Unit</label>
                  <div className="flex items-center">
                    <input type="radio" id="days" name="durationUnit" value="days" checked={durationUnit === 'days'} onChange={(e) => { setDurationUnit(e.target.value); setDurationValue(1); }} />
                    <label htmlFor="days" className="ml-2">Days</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="weeks" name="durationUnit" value="weeks" checked={durationUnit === 'weeks'} onChange={(e) => { setDurationUnit(e.target.value); setDurationValue(1); }} />
                    <label htmlFor="weeks" className="ml-2">Weeks</label>
                  </div>
                </div>
                {durationUnit === 'days' ? (
                  <div>
                    <label htmlFor="durationDays" className={labelStyle}>Number of Days: {durationValue}</label>
                    <input type="range" id="durationDays" min="1" max="7" value={durationValue} onChange={(e) => setDurationValue(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                  </div>
                ) : (
                  <div>
                    <label htmlFor="durationWeeks" className={labelStyle}>Number of Weeks</label>
                    <select id="durationWeeks" value={durationValue} onChange={(e) => setDurationValue(Number(e.target.value))} className={inputStyle}>
                      <option value="1">1 Week</option>
                      <option value="2">2 Weeks</option>
                      <option value="3">3 Weeks</option>
                      <option value="4">4 Weeks</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* NEW: Conditional Itinerary Textarea */}
            {serviceType === 'Daily/Weekly Hire' && (
              <div>
                <label htmlFor="itinerary" className={labelStyle}>Your Itinerary (Required for Daily Hire)</label>
                <textarea 
                  id="itinerary" 
                  value={itinerary} 
                  onChange={(e) => setItinerary(e.target.value)} 
                  className={inputStyle} 
                  rows={4} 
                  placeholder="Please list your planned stops for the day (e.g., 1. VI office, 2. Lekki for meeting, 3. Return to Ikeja)."></textarea>
                <p className="text-xs text-slate-500 mt-1">The price shown is a base rate. We will confirm the final quote on WhatsApp based on your itinerary.</p>
              </div>
            )}
            
            <h3 className="text-xl font-bold text-slate-900 pt-4">2. Your Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="pickupDate" className={labelStyle}>Pickup Date</label>
                  <DatePicker selected={pickupDate} onChange={(date: Date | null) => setPickupDate(date)} className={inputStyle} placeholderText="Select a date" minDate={new Date()} />
                </div>
                <div>
                  <label htmlFor="pickupTime" className={labelStyle}>Pickup Time</label>
                  <DatePicker selected={pickupTime} onChange={(date: Date | null) => setPickupTime(date)} className={inputStyle} placeholderText="Select a time" showTimeSelect showTimeSelectOnly timeIntervals={15} dateFormat="h:mm aa" />
                </div>
            </div>
            <div>
              <label htmlFor="fullName" className={labelStyle}>Full Name</label>
              <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputStyle} placeholder="e.g. John Doe" />
            </div>
            <div>
              <label htmlFor="phone" className={labelStyle}>Phone Number (WhatsApp)</label>
              <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputStyle} placeholder="e.g. 08012345678" />
            </div>
            <div>
              <label htmlFor="pickupAddress" className={labelStyle}>Pickup Address</label>
              <textarea id="pickupAddress" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} className={inputStyle} rows={2} placeholder="e.g. Murtala Muhammed Airport, Ikeja"></textarea>
            </div>
            <div>
              <label htmlFor="dropoffAddress" className={labelStyle}>Final Drop-off Address</label>
              <textarea id="dropoffAddress" value={dropoffAddress} onChange={(e) => setDropoffAddress(e.target.value)} className={inputStyle} rows={2} placeholder="e.g. Eko Hotel, Victoria Island"></textarea>
            </div>
          </div>
          
          {/* Summary & Booking Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-slate-200 shadow-lg p-8 sticky top-24">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Price Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-slate-600">
                  <span>{serviceType === 'Daily/Weekly Hire' ? 'Base Cost' : 'Cost'}</span>
                  <span className="font-medium text-slate-900">₦{baseCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Security Guard</span>
                  <span className="font-medium text-slate-900">₦{securityCost.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-200 my-4"></div>
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-slate-800">{serviceType === 'Daily/Weekly Hire' ? 'Starting From' : 'Total Estimate'}</span>
                  <span className="text-amber-600 text-3xl">₦{totalCost.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-8">
                <div className="flex items-center p-4 bg-slate-50 rounded-lg">
                  <input type="checkbox" id="security" checked={addSecurity} onChange={(e) => setAddSecurity(e.target.checked)} className="h-5 w-5 rounded text-amber-600 focus:ring-amber-500" />
                  <label htmlFor="security" className="ml-3 text-sm font-medium text-slate-700">Add Professional Security (+₦{PRICES.SECURITY_FEE.toLocaleString()})</label>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href={isFormValid ? whatsappLink : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center font-bold py-4 px-6 rounded-lg text-lg transition-all ${
                    isFormValid 
                      ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg hover:shadow-xl' 
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                  onClick={(e) => !isFormValid && e.preventDefault()}
                >
                  {isFormValid ? 'Book via WhatsApp' : 'Fill All Details to Book'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}