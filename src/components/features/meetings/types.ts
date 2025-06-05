// Tipo para as reuniões
export interface Meeting {
  id: number;
  title: string;
  date: string;
  duration: string;
  participants: number;
  status: string;
}

// Props para os componentes
export interface CreateMeetingSectionProps {
  onCreateInstantMeeting: () => void;
  onScheduleMeeting: () => void;
}

export interface MeetingsHistorySectionProps {
  meetings: Meeting[];
  isLoading?: boolean;
  onViewMeetingDetails: (title: string) => void;
  onViewAllMeetings: () => void;
}
