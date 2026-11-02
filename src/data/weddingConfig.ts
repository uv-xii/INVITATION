import type { WeddingConfig } from '../types/wedding';

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      firstName: 'Tanuj',
      fullName: 'Tanuj Singh (R.P.)',
      title: '',
      photo: '/images/tanuj-singh.jpeg',
      parents: {
        father: 'Kunvar Pratap Singh',
        mother: 'Late Sunita Singh',
        residence: 'Village Shahpur, Post Shahpur, District Jaunpur',
      },
    },
    bride: {
      firstName: 'Sudha',
      fullName: 'Sudha Singh',
      title: '',
      photo: '/images/sudha-singh-portrait.png',
      parents: {
        father: 'Hridya Narayan Singh',
        mother: 'Urmila Singh',
        residence: 'Village Sisredi, Post Jaytipur, District Azamgarh',
      },
    },
    monogram: 'T & S',
    hashtag: '#TanujWedsSudha',
  },

  weddingDetails: {
    date: '2026-11-25T00:00:00+05:30',
    displayDate: 'Wednesday, 25th November 2026',
    mantraDevanagari: '॥ श्री गणेशाय नमः ॥',
    mantraMeaning: 'Vakratunda Mahakaya Suryakoti Samaprabha | Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada ||',
    shlokaDevanagari: 'मङ्गलम् भगवान विष्णुः मङ्गलम् गरुडध्वजः। मङ्गलम् पुण्डरीकाक्षः मङ्गलाय तनो हरिः॥',
    shlokaTranslation: 'May the divine presence of the Almighty shower boundless grace, love and auspiciousness upon this sacred union.',
  },

  invitationMessage: {
    heading: 'Together With Our Families',
    subheading: 'Two souls, one sacred journey woven in love, laughter, and timeless traditions.',
    body: 'We joyfully invite you to celebrate the beginning of our forever as we exchange sacred vows, take the seven vows around the holy agni, and step into our new life together. Your gracious presence and warm blessings will make our special day truly unforgettable.',
    closingBlessing: 'Awaiting your esteemed presence and warm wishes.',
  },

  // Wedding events in date order.
  events: [
    {
      id: 'haldi',
      name: 'Haldi Ceremony',
      hindiTitle: 'मंगल हल्दी उत्सव',
      date: 'Monday, 23rd November 2026',
      dateShort: '23 Nov',
      time: 'Time to be announced',
      venue: 'Shiddhivinayak Marriage Hall, Thekma',
      address: 'Thekma, Uttar Pradesh',
      description: 'Join the families for the Haldi celebration.',
      googleMapsUrl: 'https://maps.google.com/?q=Shiddhivinayak+Marriage+Hall+Thekma',
      isMainCeremony: false,
      iconName: 'Flower2',
    },
    {
      id: 'mehendi',
      name: 'Mehendi Ki Raat',
      hindiTitle: 'शुभ मेहंदी',
      date: 'Tuesday, 24th November 2026',
      dateShort: '24 Nov',
      time: 'Time to be announced',
      venue: 'Shiddhivinayak Marriage Hall, Thekma',
      address: 'Thekma, Uttar Pradesh',
      description: 'Celebrate the Mehendi ceremony with the families.',
      googleMapsUrl: 'https://maps.google.com/?q=Shiddhivinayak+Marriage+Hall+Thekma',
      isMainCeremony: false,
      iconName: 'Sparkles',
    },
    {
      id: 'wedding',
      name: 'Wedding Ceremony',
      hindiTitle: 'शुभ विवाह संस्कार',
      date: 'Wednesday, 25th November 2026',
      dateShort: '25 Nov',
      venue: 'Shiddhivinayak Marriage Hall, Thekma',
      address: 'Thekma, Uttar Pradesh',
      description: 'Join us for the wedding ceremony of Tanuj and Sudha.',
      googleMapsUrl: 'https://maps.google.com/?q=Shiddhivinayak+Marriage+Hall+Thekma',
      isMainCeremony: true,
      iconName: 'Flame',
    },
    {
      id: 'vidai',
      name: 'Vidai',
      hindiTitle: 'शुभ विदाई',
      date: 'Thursday, 26th November 2026',
      dateShort: '26 Nov',
      time: '5:00 AM',
      venue: 'Shiddhivinayak Marriage Hall, Thekma',
      address: 'Thekma, Uttar Pradesh',
      description: 'The families gather for Sudha and Tanuj’s Vidai.',
      googleMapsUrl: 'https://maps.google.com/?q=Shiddhivinayak+Marriage+Hall+Thekma',
      isMainCeremony: false,
      iconName: 'Heart',
    },
  ],

  venue: {
    name: 'Shiddhivinayak Marriage Hall',
    subHeading: 'Thekma',
    address: 'Shiddhivinayak Marriage Hall, Thekma, Uttar Pradesh',
    city: 'Thekma',
    state: 'Uttar Pradesh',
    pincode: '',
    photo: '/images/tanuj-sudha-portrait.jpeg',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Shiddhivinayak%20Marriage%20Hall%20Thekma&output=embed',
    googleMapsDirectionsUrl: 'https://maps.google.com/?q=Shiddhivinayak+Marriage+Hall+Thekma',
  },

  music: {
    title: 'Wedding Celebration',
    artist: 'Tanuj & Sudha',
    audioUrl: '/audio/wedding-background.mp3',
  },

  sharing: {
    websiteUrl: typeof window !== 'undefined' ? window.location.href : '',
    ogTitle: 'The Wedding of Tanuj & Sudha — Official Invitation',
    ogDescription: "Join us to celebrate Tanuj and Sudha's wedding on 25 November 2026 in Thekma.",
    whatsappMessageTemplate: `✨ *WEDDING INVITATION* ✨\n\n॥ श्री गणेशाय नमः ॥\n\nTogether with our families, we joyfully invite you to celebrate the wedding of\n\n*Tanuj Singh & Sudha Singh*\n\n📅 *Wedding:* Wednesday, 25th November 2026\n📍 *Venue:* Shiddhivinayak Marriage Hall, Thekma\n\nPlease view the wedding itinerary, venue details, and RSVP through our invitation:\n{URL}\n\nWe look forward to celebrating with you! 🙏`,
  },

  contact: {
    rsvpPhone1: '+91 88405 44067',
    rsvpName1: 'D.K. Singh Shahi',
    rsvpPhone2: '',
    rsvpName2: '',
  },
};
