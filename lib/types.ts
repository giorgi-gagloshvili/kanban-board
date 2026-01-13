export type TPhase = "new" | "sent_to_hotels" | "offers_received" | "completed";

export type TColumn = {
  id: number;
  name: string;
  phase: TPhase;
  color: string;
};

export type TCard = {
  id: string;
  clientName: string;
  contactPerson: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  potentialValue: number;
  phase: TPhase;
  hotels: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
};
