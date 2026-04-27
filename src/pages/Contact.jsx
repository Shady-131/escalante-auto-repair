import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import InputField from '../components/ui/InputField';

const INFO_CARDS = [
  {
    Icon: Phone,
    label: 'Phone',
    content: <a href="tel:+14352338048" className="text-brand-700 dark:text-red-400 font-semibold hover:underline">+1 435-233-8048</a>,
  },
  {
    Icon: MapPin,
    label: 'Location',
    content: (
      <span>
        Utah, USA —{' '}
        <a href="https://maps.app.goo.gl/ckFp17UG6B5LYCD28" target="_blank" rel="noreferrer"
          className="text-brand-700 dark:text-red-400 font-semibold hover:underline">
          View on Google Maps →
        </a>
      </span>
    ),
  },
  {
    Icon: Clock,
    label: 'Hours',
    content: 'Mon–Fri: 8am–6pm · Saturday: 8am–4pm · Sunday: Closed',
  },
  {
    Icon: MessageCircle,
    label: 'WhatsApp',
    content: (
      <a href="https://wa.me/14352338048" target="_blank" rel="noreferrer"
        className="text-brand-700 dark:text-red-400 font-semibold hover:underline">
        Message us on WhatsApp →
      </a>
    ),
  },
];

export default function Contact({ showToast }) {
  function handleSubmit() {
    showToast("✅ Message sent! We'll contact you within 24 hours.");
  }

  return (
    <main className="py-16 px-6 min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <SectionHeader badge="Get In Touch" title="Contact Us" />
        <div className="grid md:grid-cols-5 gap-8">

          {/* Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {INFO_CARDS.map(({ Icon, label, content }) => (
              <div key={label}
                className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800
                  rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="w-10 h-10 rounded-lg bg-brand-700/10 dark:bg-red-900/20
                  flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand-700 dark:text-red-400" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-bold text-sm mb-0.5 text-gray-900 dark:text-white">{label}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="md:col-span-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-6
            border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-5 text-gray-900 dark:text-white">Send Us a Message</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputField id="fname" label="First Name" placeholder="John" />
              <InputField id="lname" label="Last Name" placeholder="Doe" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputField id="email" label="Email" type="email" placeholder="you@email.com" />
              <InputField id="phone" label="Phone" type="tel" placeholder="+1 435-000-0000" />
            </div>
            <div className="mb-4">
              <InputField id="service" label="Service Needed" as="select">
                <option>Select a service...</option>
                <option>Engine Repair</option>
                <option>Brake Service</option>
                <option>Oil Change</option>
                <option>AC Service</option>
                <option>Transmission</option>
                <option>Electrical</option>
                <option>Other</option>
              </InputField>
            </div>
            <div className="mb-5">
              <InputField
                id="msg"
                label="Message"
                as="textarea"
                placeholder="Describe your vehicle issue..."
              />
            </div>
            <Button variant="primary" size="lg" className="w-full justify-center" onClick={handleSubmit}>
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}