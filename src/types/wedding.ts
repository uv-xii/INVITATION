export interface EventItem {
  id: string;
  name: string;
  hindiTitle?: string;
  date: string;
  dateShort: string;
  time?: string;
  venue: string;
  address: string;
  description: string;
  isMainCeremony?: boolean;
  googleMapsUrl: string;
  iconName?: 'Heart' | 'Sparkles' | 'Flower2' | 'Music' | 'Flame';
}

export interface WeddingConfig {
  couple: {
    groom: {
      firstName: string;
      fullName: string;
      title: string;
      education?: string;
      photo: string;
      parents: {
        father: string;
        mother: string;
        grandParents?: string;
        residence: string;
      };
    };
    bride: {
      firstName: string;
      fullName: string;
      title: string;
      education?: string;
      photo: string;
      parents: {
        father: string;
        mother: string;
        grandParents?: string;
        residence: string;
      };
    };
    monogram: string;
    hashtag: string;
  };
  weddingDetails: {
    date: string; // ISO string for live countdown
    displayDate: string;
    mantraDevanagari: string;
    mantraMeaning: string;
    shlokaDevanagari: string;
    shlokaTranslation: string;
  };
  invitationMessage: {
    heading: string;
    subheading: string;
    body: string;
    closingBlessing: string;
  };
  events: EventItem[];
  venue: {
    name: string;
    subHeading: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    photo: string; // The one venue photograph
    googleMapsEmbedUrl: string;
    googleMapsDirectionsUrl: string;
  };
  music?: {
    title: string;
    artist: string;
    audioUrl: string;
  };
  sharing: {
    websiteUrl: string;
    ogTitle: string;
    ogDescription: string;
    whatsappMessageTemplate: string;
  };
  contact: {
    rsvpPhone1: string;
    rsvpName1: string;
    rsvpPhone2: string;
    rsvpName2: string;
  };
}
