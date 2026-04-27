export const SERVICES = [
  {
    icon: '🔧',
    title: 'Engine Diagnostics & Repair',
    desc: 'Full scan, compression test, valve adjustments, timing belt replacement, head gasket repair, and engine rebuilds.',
    price: 'From $89',
  },
  {
    icon: '🛞',
    title: 'Brake System',
    desc: 'Brake pads, rotors, calipers, master cylinder, ABS diagnostics, brake fluid flush, and parking brake.',
    price: 'From $49/axle',
  },
  {
    icon: '🌡️',
    title: 'AC & Climate Control',
    desc: 'AC recharge (R134a/R1234yf), compressor, evaporator, condenser, heater core, and blower motor.',
    price: 'From $69',
  },
  {
    icon: '⚡',
    title: 'Electrical & Electronics',
    desc: 'Battery replacement, alternator, starter motor, wiring diagnosis, ECU programming, and sensor replacement.',
    price: 'From $59',
  },
  {
    icon: '🛢️',
    title: 'Oil Change & Maintenance',
    desc: 'Full synthetic, semi-synthetic, and conventional oil service. Multi-point inspection included.',
    price: 'From $39',
  },
  {
    icon: '⚙️',
    title: 'Transmission',
    desc: 'Automatic & manual transmission service, fluid change, rebuild, clutch replacement, and driveshaft.',
    price: 'From $129',
  },
  {
    icon: '🏎️',
    title: 'Suspension & Steering',
    desc: 'Shocks, struts, ball joints, tie rods, wheel alignment, power steering, and sway bar links.',
    price: 'From $79',
  },
  {
    icon: '💨',
    title: 'Exhaust System',
    desc: 'Catalytic converter, muffler, flex pipe, oxygen sensors, and full exhaust system replacement.',
    price: 'From $99',
  },
  {
    icon: '💧',
    title: 'Cooling System',
    desc: 'Radiator flush, water pump, thermostat, hoses, coolant reservoir, and overheating diagnosis.',
    price: 'From $65',
  },
];

export const REVIEWS = [
  {
    initials: 'JM',
    name: 'James Mitchell',
    date: '2 weeks ago',
    rating: 5,
    text: 'Escalante Auto Repair saved me hundreds! They diagnosed my transmission issue in under an hour and had it fixed by the next day. Honest, fast, and professional.',
  },
  {
    initials: 'SR',
    name: 'Sandra Rodriguez',
    date: '1 month ago',
    rating: 5,
    text: "Best mechanic in Utah, hands down. They explained everything clearly, showed me the worn parts, and didn't push for unnecessary repairs. My go-to shop forever.",
  },
  {
    initials: 'TK',
    name: 'Tyler Kim',
    date: '3 weeks ago',
    rating: 5,
    text: "Called them at 8am with a blown radiator hose. Car was done by noon. Incredibly fair pricing and super friendly staff. I'll recommend them to everyone I know.",
  },
  {
    initials: 'ML',
    name: 'Maria Lopez',
    date: '5 days ago',
    rating: 5,
    text: 'Took my RAV4 in for an AC issue. They had it fixed same day at a very fair price. The team was upfront about costs and had my car ready before I expected.',
  },
];

export const TRUST_ITEMS = [
  { icon: 'BadgeCheck', text: 'ASE Certified Technicians' },
  { icon: 'ShieldCheck', text: 'Warranty on All Repairs' },
  { icon: 'DollarSign', text: 'No Surprise Fees — Free Estimates' },
  { icon: 'Clock', text: 'Fast Turnaround — Same Day Service Available' },
  { icon: 'Camera', text: 'Before & After Photos Provided' },
];

export const INITIAL_BOOKINGS = [
  { id: 'ESC-2026-047', customer: 'John Doe', vehicle: '2019 Honda Civic', service: 'Brake Service', date: 'Apr 20', status: 'In Progress' },
  { id: 'ESC-2026-048', customer: 'Sandra R.', vehicle: '2018 Chevy Malibu', service: 'Brake Service', date: 'Apr 20', status: 'In Progress' },
  { id: 'ESC-2026-049', customer: 'Tyler K.', vehicle: '2021 Toyota Camry', service: 'AC Recharge', date: 'Apr 20', status: 'Scheduled' },
  { id: 'ESC-2026-050', customer: 'Maria L.', vehicle: '2017 Nissan Sentra', service: 'Engine Diag.', date: 'Apr 21', status: 'Pending' },
  { id: 'ESC-2026-051', customer: 'Robert T.', vehicle: '2015 Subaru Outback', service: 'Transmission', date: 'Apr 22', status: 'Pending' },
];

export const STATUS_OPTIONS = [
  'Pending',
  'Scheduled',
  'In Progress',
  'Quality Check',
  'Ready',
  'Completed',
  'Cancelled',
];

export const TODAYS_SCHEDULE = [
  { time: '8:00 AM', customer: 'James M.', vehicle: '2020 Ford F-150', service: 'Oil Change', status: 'Completed' },
  { time: '9:30 AM', customer: 'Sandra R.', vehicle: '2018 Chevy Malibu', service: 'Brake Service', status: 'In Progress' },
  { time: '11:00 AM', customer: 'John D.', vehicle: '2019 Honda Civic', service: 'Diagnostics', status: 'In Progress' },
  { time: '1:00 PM', customer: 'Tyler K.', vehicle: '2021 Toyota Camry', service: 'AC Recharge', status: 'Scheduled' },
  { time: '2:30 PM', customer: 'Maria L.', vehicle: '2017 Nissan Sentra', service: 'Engine Diag.', status: 'Scheduled' },
  { time: '4:00 PM', customer: 'Robert T.', vehicle: '2015 Subaru Outback', service: 'Transmission', status: 'Pending' },
];

export const CUSTOMER_HISTORY = [
  { date: 'Apr 20, 2026', service: 'Brake Pad Replacement', vehicle: '2019 Honda Civic', tech: 'E. Escalante', cost: '$189', status: 'In Progress' },
  { date: 'Mar 15, 2026', service: 'Full Synthetic Oil Change', vehicle: '2019 Honda Civic', tech: 'E. Escalante', cost: '$65', status: 'Completed' },
  { date: 'Feb 02, 2026', service: 'AC Recharge R134a', vehicle: '2016 Toyota RAV4', tech: 'M. Torres', cost: '$89', status: 'Completed' },
  { date: 'Jan 10, 2026', service: 'Engine Diagnostics', vehicle: '2016 Toyota RAV4', tech: 'E. Escalante', cost: '$89', status: 'Completed' },
  { date: 'Dec 05, 2025', service: 'Tire Rotation & Balance', vehicle: '2019 Honda Civic', tech: 'M. Torres', cost: '$49', status: 'Completed' },
];

export const TRACK_STEPS = [
  { label: 'Vehicle Received',    desc: 'Checked in at 8:30 AM',                       done: true,  active: false },
  { label: 'Inspection Complete', desc: 'Diagnosis finished, estimate approved',         done: true,  active: false },
  { label: 'Repair In Progress',  desc: 'Brake pads and fluid flush underway',           done: false, active: true  },
  { label: 'Quality Check',       desc: 'Final safety inspection pending',               done: false, active: false },
  { label: 'Ready for Pickup',    desc: 'Awaiting completion',                           done: false, active: false },
];