import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-supabase-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface BlessingItem {
  id: string;
  name: string;
  relation?: string;
  city?: string;
  message: string;
  created_at: string;
}

export interface RSVPSubmission {
  id?: string;
  guest_name: string;
  phone?: string;
  email?: string;
  attending: 'yes' | 'no';
  guest_count: number;
  events_attending?: string[];
  dietary_preference?: string;
  notes?: string;
  created_at?: string;
}

const DEFAULT_BLESSINGS: BlessingItem[] = [];

const LOCAL_STORAGE_BLESSINGS_KEY = 'wedding_blessings_cache_v1';
const LOCAL_STORAGE_RSVP_KEY = 'wedding_rsvps_cache_v1';

export async function getBlessings(): Promise<BlessingItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('blessings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local storage:', err);
    }
  }

  // Fallback to local storage or defaults
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_BLESSINGS_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn('LocalStorage read error:', e);
  }

  return DEFAULT_BLESSINGS;
}

export async function addBlessing(blessing: Omit<BlessingItem, 'id' | 'created_at'>): Promise<BlessingItem> {
  const newBlessing: BlessingItem = {
    id: 'blessing-' + Date.now(),
    name: blessing.name.trim(),
    relation: blessing.relation?.trim() || 'Well-wisher',
    city: blessing.city?.trim() || 'Guest',
    message: blessing.message.trim(),
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('blessings')
        .insert([
          {
            name: newBlessing.name,
            relation: newBlessing.relation,
            city: newBlessing.city,
            message: newBlessing.message,
          },
        ])
        .select()
        .single();

      if (!error && data) {
        return data;
      }
      console.warn('Supabase insert returned error, saving locally:', error);
    } catch (err) {
      console.warn('Supabase connection failed:', err);
    }
  }

  // Save to local storage
  try {
    const existing = await getBlessings();
    const updated = [newBlessing, ...existing];
    localStorage.setItem(LOCAL_STORAGE_BLESSINGS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('LocalStorage write error:', e);
  }

  return newBlessing;
}

export async function saveRSVP(rsvpData: RSVPSubmission): Promise<{ success: boolean; message: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('rsvps').insert([
        {
          guest_name: rsvpData.guest_name,
          phone: rsvpData.phone,
          attending: rsvpData.attending,
          guest_count: rsvpData.guest_count,
          events_attending: rsvpData.events_attending || [],
          dietary_preference: rsvpData.dietary_preference || 'Regular',
          notes: rsvpData.notes,
        },
      ]);

      if (!error) {
        return { success: true, message: 'Your RSVP has been saved to the registry. Thank you!' };
      }
      console.warn('Supabase RSVP insert error:', error);
    } catch (err) {
      console.warn('Supabase RSVP request failed:', err);
    }
  }

  // Save to local storage for demo/offline mode
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_RSVP_KEY);
    const list: RSVPSubmission[] = raw ? JSON.parse(raw) : [];
    list.push({ ...rsvpData, id: 'rsvp-' + Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem(LOCAL_STORAGE_RSVP_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('LocalStorage RSVP write error:', e);
  }

  return { 
    success: true, 
    message: 'Your RSVP has been saved successfully! (Demo / Local Mode active)' 
  };
}
