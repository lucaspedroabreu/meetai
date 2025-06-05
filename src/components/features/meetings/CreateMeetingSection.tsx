"use client";

import { Button } from "@/components/ui/button";
import { Video, Calendar, Plus } from "lucide-react";
import type { CreateMeetingSectionProps } from "./types";

export const CreateMeetingSection = ({
  onCreateInstantMeeting,
  onScheduleMeeting,
}: CreateMeetingSectionProps) => (
  <div className="max-w-4xl mx-auto">
    <div className="bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-2xl border border-violet-200/20 p-8">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
          <Video className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Iniciar Nova Reunião</h2>
          <p className="text-muted-foreground mb-6">
            Crie uma reunião instantânea ou agende para depois
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600"
            onClick={onCreateInstantMeeting}
          >
            <Plus className="w-5 h-5 mr-2" />
            Reunião Instantânea
          </Button>
          <Button size="lg" variant="outline" onClick={onScheduleMeeting}>
            <Calendar className="w-5 h-5 mr-2" />
            Agendar Reunião
          </Button>
        </div>
      </div>
    </div>
  </div>
);
