"use client";

import { Button } from "@/components/ui/button";
import { Video, Calendar, Clock, Users } from "lucide-react";
import type { MeetingsHistorySectionProps } from "./types";

export const MeetingsHistorySection = ({
  meetings,
  isLoading,
  onViewMeetingDetails,
  onViewAllMeetings,
}: MeetingsHistorySectionProps) => {
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Reuniões Recentes</h3>
          <p className="text-muted-foreground">Carregando suas reuniões...</p>
        </div>

        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-muted/20 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-muted/20 rounded w-3/4" />
                    <div className="flex space-x-4">
                      <div className="h-4 bg-muted/20 rounded w-20" />
                      <div className="h-4 bg-muted/20 rounded w-16" />
                      <div className="h-4 bg-muted/20 rounded w-24" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-6 bg-muted/20 rounded w-16" />
                  <div className="h-8 bg-muted/20 rounded w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Reuniões Recentes</h3>
        <p className="text-muted-foreground">
          Acompanhe suas últimas reuniões e atividades
        </p>
      </div>

      <div className="grid gap-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:bg-card/70 transition-all duration-200 hover:border-violet-200/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/20 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1">
                    {meeting.title}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {meeting.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {meeting.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {meeting.participants} participantes
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    meeting.status === "Concluída"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  }`}
                >
                  {meeting.status}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewMeetingDetails(meeting.title)}
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State or Load More */}
      <div className="text-center mt-6">
        <Button variant="outline" size="lg" onClick={onViewAllMeetings}>
          Ver Todas as Reuniões
        </Button>
      </div>
    </div>
  );
};
