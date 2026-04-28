import {
  Gauge, Disc, Droplets, Wind, Settings, Zap,
  RotateCcw, ArrowUpDown, Activity,
} from 'lucide-react';

/* ── Services ─────────────────────────────────────────────────────────── */
export const SERVICES = [
  { title: 'Engine Repair',  Icon: Gauge,      desc: 'Complete engine diagnostics and repair for all makes and models.',       price: 'From $150' },
  { title: 'Brake Service',  Icon: Disc,       desc: 'Brake pad, rotor, and fluid service to keep you safe on the road.',     price: 'From $80'  },
  { title: 'Oil Change',     Icon: Droplets,   desc: 'Full synthetic and conventional oil changes with filter replacement.',   price: 'From $45'  },
  { title: 'AC Service',     Icon: Wind,       desc: 'AC recharge, leak detection, and compressor repair for all vehicles.',  price: 'From $89'  },
  { title: 'Transmission',   Icon: Settings,   desc: 'Transmission flush, repair, and replacement for all vehicle types.',    price: 'From $200' },
  { title: 'Electrical',     Icon: Zap,        desc: 'Battery, alternator, starter, and full electrical diagnostics.',        price: 'From $75'  },
  { title: 'Tire Service',   Icon: RotateCcw,  desc: 'Tire rotation, balancing, mounting, and wheel alignment services.',     price: 'From $25'  },
  { title: 'Suspension',     Icon: ArrowUpDown,desc: 'Shocks, struts, and alignment for a smooth and stable ride.',           price: 'From $120' },
  { title: 'Diagnostics',    Icon: Activity,   desc: 'OBD-II scan and full vehicle inspection with a detailed report.',       price: 'From $60'  },
];

/* ── Status options ───────────────────────────────────────────────────── */
export const STATUS_OPTIONS = ['Pending', 'Scheduled', 'In Progress', 'Completed', 'Cancelled'];

/* ── Bookings ─────────────────────────────────────────────────────────── */
export const MOCK_BOOKINGS = [
  { id: 'ESC-2026-047', customer: 'John Doe',      vehicle: '2019 Honda Civic',    service: 'Brake Pad Replacement',    date: 'Apr 20, 2026', status: 'In Progress' },
  { id: 'ESC-2026-046', customer: 'Maria Torres',  vehicle: '2018 Toyota Camry',   service: 'Full Synthetic Oil Change',date: 'Apr 20, 2026', status: 'Completed'   },
  { id: 'ESC-2026-045', customer: 'James Lee',     vehicle: '2020 Honda Accord',   service: 'Engine Diagnostics',       date: 'Apr 19, 2026', status: 'Pending'     },
  { id: 'ESC-2026-044', customer: 'Sarah Johnson', vehicle: '2015 Ford F-150',     service: 'AC Recharge',              date: 'Apr 19, 2026', status: 'Scheduled'   },
  { id: 'ESC-2026-043', customer: 'Carlos Mendez', vehicle: '2019 Chevy Malibu',   service: 'Transmission Flush',       date: 'Apr 18, 2026', status: 'Completed'   },
  { id: 'ESC-2026-042', customer: 'Emily White',   vehicle: '2021 Tesla Model 3',  service: 'Tire Rotation',            date: 'Apr 18, 2026', status: 'Cancelled'   },
];

/* ── Today's schedule ─────────────────────────────────────────────────── */
export const TODAYS_SCHEDULE = [
  { time: '8:00 AM',  customer: 'Maria Torres',  vehicle: '2018 Toyota Camry',  service: 'Oil Change',          status: 'Completed'   },
  { time: '9:30 AM',  customer: 'James Lee',     vehicle: '2020 Honda Accord',  service: 'Brake Pads',          status: 'In Progress' },
  { time: '11:00 AM', customer: 'Sarah Johnson', vehicle: '2015 Ford F-150',    service: 'Engine Diagnostics',  status: 'Pending'     },
  { time: '1:00 PM',  customer: 'Carlos Mendez', vehicle: '2019 Chevy Malibu',  service: 'AC Recharge',         status: 'Scheduled'   },
  { time: '2:30 PM',  customer: 'Emily White',   vehicle: '2021 Tesla Model 3', service: 'Tire Rotation',       status: 'Scheduled'   },
];

/* ── Customer service history ─────────────────────────────────────────── */
export const CUSTOMER_HISTORY = [
  { date: 'Apr 20, 2026', service: 'Brake Pad Replacement',    vehicle: '2019 Honda Civic',   tech: 'E. Escalante', cost: '$189.00', status: 'In Progress' },
  { date: 'Mar 15, 2026', service: 'Full Synthetic Oil Change', vehicle: '2019 Honda Civic',   tech: 'R. Martinez',  cost: '$65.00',  status: 'Completed'   },
  { date: 'Feb 02, 2026', service: 'AC Recharge R134a',         vehicle: '2019 Honda Civic',   tech: 'E. Escalante', cost: '$89.00',  status: 'Completed'   },
  { date: 'Jan 10, 2026', service: 'Tire Rotation & Balance',   vehicle: '2017 Ford Explorer', tech: 'J. Gomez',     cost: '$35.00',  status: 'Completed'   },
  { date: 'Nov 20, 2025', service: 'Engine Diagnostics',         vehicle: '2017 Ford Explorer', tech: 'E. Escalante', cost: '$60.00',  status: 'Completed'   },
];

/* ── Repair tracking steps ────────────────────────────────────────────── */
export const TRACK_STEPS = [
  { label: 'Vehicle Received',    desc: 'Your vehicle was checked in at 8:30 AM',                  done: true,  active: false },
  { label: 'Initial Inspection',  desc: 'Technician inspected and confirmed issue',                 done: true,  active: false },
  { label: 'Repair in Progress',  desc: 'Brake pads being replaced, fluid flush underway',          done: false, active: true  },
  { label: 'Quality Check',       desc: 'Awaiting final inspection and test drive',                 done: false, active: false },
  { label: 'Ready for Pickup',    desc: 'You will be notified by call or text when complete',       done: false, active: false },
];

/* ── Reviews ──────────────────────────────────────────────────────────── */
export const REVIEWS = [
  { name: 'Maria G.',  initials: 'MG', rating: 5, text: 'Incredible service! They fixed my brakes same day and showed me the old parts. Very transparent.',         date: 'Apr 2026' },
  { name: 'James P.',  initials: 'JP', rating: 5, text: 'Best mechanic in Utah. Fair prices and they always explain everything clearly before doing work.',          date: 'Mar 2026' },
  { name: 'Sandra L.', initials: 'SL', rating: 5, text: 'My AC was fixed in under 3 hours. They even sent before and after photos. 10/10 recommend!',              date: 'Feb 2026' },
  { name: 'Carlos R.', initials: 'CR', rating: 5, text: 'Honest, fast, and professional. They found an issue the dealership missed. Lifelong customer now.',        date: 'Jan 2026' },
];

/* ── Spare parts inventory ────────────────────────────────────────────── */
export const INITIAL_PARTS = [
  { id: 'P001', name: 'Brake Pads (Front)',     category: 'Brakes',     stock: 12, reorderAt: 5,  unit: 'set',     price: 45  },
  { id: 'P002', name: 'Brake Rotors',           category: 'Brakes',     stock: 4,  reorderAt: 4,  unit: 'pair',    price: 89  },
  { id: 'P003', name: 'Engine Oil Filter',      category: 'Engine',     stock: 25, reorderAt: 10, unit: 'pcs',     price: 8   },
  { id: 'P004', name: 'Air Filter',             category: 'Engine',     stock: 3,  reorderAt: 5,  unit: 'pcs',     price: 15  },
  { id: 'P005', name: 'Spark Plugs',            category: 'Engine',     stock: 32, reorderAt: 8,  unit: 'pcs',     price: 12  },
  { id: 'P006', name: 'Serpentine Belt',        category: 'Engine',     stock: 2,  reorderAt: 3,  unit: 'pcs',     price: 35  },
  { id: 'P007', name: 'Coolant (1L)',           category: 'Fluids',     stock: 18, reorderAt: 6,  unit: 'bottles', price: 18  },
  { id: 'P008', name: 'Transmission Fluid',     category: 'Fluids',     stock: 1,  reorderAt: 4,  unit: 'qt',      price: 22  },
  { id: 'P009', name: 'Battery (Group 35)',     category: 'Electrical', stock: 5,  reorderAt: 3,  unit: 'pcs',     price: 120 },
  { id: 'P010', name: 'Wiper Blades',           category: 'Exterior',   stock: 8,  reorderAt: 4,  unit: 'pairs',   price: 25  },
];