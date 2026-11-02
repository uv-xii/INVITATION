export type RSVPAttendance = 'attending' | 'unable';

export interface RSVPSubmission {
  name: string;
  whatsapp: string;
  attendance: RSVPAttendance;
}

interface RSVPResponse {
  success?: boolean;
  message?: string;
  error?: string;
  isUpdate?: boolean;
}

export async function submitRSVP(formData: RSVPSubmission): Promise<RSVPResponse> {
  const response = await fetch('/api/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  let result: RSVPResponse;
  try {
    result = await response.json() as RSVPResponse;
  } catch {
    throw new Error('The RSVP service returned an invalid response. Please try again.');
  }

  if (!response.ok || result.success === false) {
    throw new Error(result.message || result.error || 'RSVP submission failed.');
  }

  return result;
}
